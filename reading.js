(() => {
  'use strict';
  const C=window.PianoReadingCore,KEY='piano-reading-v1',$=id=>document.getElementById(id);
  window.createPianoReading=function(api){
    let bank=null,saved=C.empty(),loading=null,current=null,lastTick=performance.now();
    const families=new Map(),variants=new Map();
    const persist=()=>{try{localStorage.setItem(KEY,JSON.stringify(saved));$('reading-storage-note').hidden=true;}catch(_){$('reading-storage-note').hidden=false;}};
    const moduleFor=id=>C.modules.find(m=>m.id===id);
    async function ready(){
      if(bank)return true;if(loading)return loading;
      $('reading-start').disabled=true;$('reading-status').textContent='Đang mở ngân hàng bài…';
      loading=(async()=>{
        try{
          const response=await fetch('assets/books/reading-bank.json?v=f9e32bb-7661dc6904bf');if(!response.ok)throw Error('Không tải được ngân hàng bài');
          bank=await response.json();if(bank.version!=='reading-bank-v1'||bank.families.length!==252)throw Error('Ngân hàng bài không đúng phiên bản');
          for(const family of bank.families){families.set(family.code,family);for(const variant of family.variants)variants.set(variant.id,{family,variant});}
          let raw=null;try{raw=JSON.parse(localStorage.getItem(KEY)||'null');}catch(_){}
          saved=C.sanitize(raw,bank);render();return true;
        }catch(error){bank=null;$('reading-status').textContent=`${error.message}. Kiểm tra kết nối rồi bấm Thử lại. Nếu dùng offline, hãy mở ngân hàng bài một lần khi có mạng.`;$('reading-start').textContent='Thử lại';return false;}
        finally{$('reading-start').disabled=false;loading=null;}
      })();return loading;
    }
    function render(){
      if(!bank)return;
      const completed=Object.entries(saved.records).filter(([,r])=>r.completed>0),groups=new Set(completed.map(([id])=>id.split('::')[0]));
      $('reading-total').textContent=`${groups.size}/252 nhóm · ${completed.length}/1.008 biến thể đã tập · ${completed.filter(([,r])=>r.needsReview).length} cần ôn`;
      $('reading-level').value=String(saved.level);$('reading-level').disabled=!!saved.session&&!saved.session.finished;
      $('reading-start').textContent=saved.session&&!saved.session.finished?'Tiếp tục buổi đang tập':'Bắt đầu 45 phút';
      $('reading-status').textContent=saved.session?.finished?`Buổi ${saved.session.number}: ${saved.session.items.filter(i=>i.status==='done').length} bài đã tập, ${saved.session.items.filter(i=>i.status==='skipped').length} bài bỏ qua vẫn chờ tập.`:(saved.level===1?'9 phần mức 1 · Look-ahead chờ mức 2 · tiến độ lưu trên thiết bị này.':'10 phần · khoảng 22 lượt · tiến độ lưu trên thiết bị này.');
      $('reading-modules').replaceChildren();
      for(const module of C.modules){
        const list=bank.families.filter(f=>f.code.startsWith(module.id)),ids=list.flatMap(f=>f.variants.map(v=>v.id)),done=ids.filter(id=>saved.records[id]?.completed>0).length;
        const card=document.createElement('article');card.className='reading-module';
        const title=document.createElement('h2');title.textContent=module.title;
        const meta=document.createElement('p');meta.textContent=`${list.length} nhóm · ${module.minutes} phút trong buổi`;
        const progress=document.createElement('progress');progress.max=ids.length;progress.value=done;progress.setAttribute('aria-label',`Đã tập ${done}/${ids.length} biến thể ${module.title}`);
        const count=document.createElement('span');count.textContent=`${done}/${ids.length} biến thể`;
        const button=document.createElement('button');button.type='button';button.className='text-button';button.textContent='Tập riêng phần này →';button.disabled=(!!saved.session&&!saved.session.finished)||list.every(f=>f.level>saved.level);button.title=list.every(f=>f.level>saved.level)?'Phần này chỉ có bài mức 2':'';
        button.addEventListener('click',()=>begin(module.id));card.append(title,meta,progress,count,button);$('reading-modules').append(card);
      }
      $('reading-session-plan').replaceChildren();
      if(saved.session){
        for(const item of saved.session.items){const row=document.createElement('li');row.textContent=`${item.status==='done'?'✓':item.status==='skipped'?'↷':'○'} ${item.id} · ${moduleFor(item.module).title}`;$('reading-session-plan').append(row);}
      }
    }
    async function begin(only=null){
      if(!await ready())return;
      if(!saved.session||saved.session.finished){
        const next=C.plan(bank,saved,Date.now(),only);
        if(!next.items.length){$('reading-status').textContent='Chưa có bài đủ điều kiện: đổi mức hoặc chờ thời gian giãn cách 7 ngày. Nếu đã dùng hết lượt thị tấu, cần sheet mới. Tiến độ được giữ nguyên.';return;}
        saved.session=next;persist();
      }
      open();
    }
    function record(id){return saved.records[id]||(saved.records[id]={completed:0,reads:0,lastSeen:0,needsReview:false,heard:false});}
    function snapshot(){if(current&&saved.session){saved.session.items[saved.session.cursor].settings=api.settings();persist();}}
    function open(){
      const session=saved.session,item=session?.items[session.cursor];if(!item)return;
      const {family,variant}=variants.get(item.id),lesson=C.lesson(family,variant);
      current=item.id;
      if(!item.exposed){item.exposed=true;record(item.id).lastSeen=Date.now();persist();}
      api.open(lesson,item.settings);
      updateTask(lesson,family,item);render();lastTick=performance.now();
    }
    function updateTask(lesson,family,item){
      const session=saved.session,module=moduleFor(item.module),position=C.modules.findIndex(m=>m.id===item.module)+1;
      $('reading-location').textContent=`Buổi ${session.number} · Phần ${position}/10 · ${module.title}`;
      $('reading-task-title').textContent=`Bài ${session.cursor+1}/${session.items.length} · Biến thể ${Number(item.id.split('::v')[1])}/4`;
      $('reading-task-rule').textContent=family.instruction;
      $('reading-kind').textContent=item.fresh?(lesson.isSightReading?'Đọc mới · chưa nghe mẫu':'Biến thể mới'):'Ôn bài đã gặp';
      $('reading-kind').dataset.kind=item.fresh?'fresh':'review';
      $('reading-source-note').textContent=lesson.sourceNote;
      $('reading-confirm').checked=false;$('reading-good').disabled=true;$('reading-review').disabled=true;
      $('reading-confirm-label').textContent=lesson.isSightReading?'Tôi đã chơi trên đàn và tự kiểm tra lượt đọc.':'Tôi đã thực hiện mục tiêu bài này trên đàn / trả lời câu hỏi.';
      $('reading-reveal').hidden=!lesson.conceal;
      $('reading-reveal').textContent=lesson.conceal==='notation'?'Tôi đã tìm nốt trên khuông · hiện đáp án':'Tôi đã nghe / trả lời · hiện sheet kiểm tra';
      $('reading-listen-help').textContent=lesson.conceal==='notation'?'Nhìn phím sáng, hình dung nốt ở khóa nhạc rồi mở đáp án.':lesson.conceal?'Nghe mẫu khi sheet đang giấu. Trả lời bằng lời hoặc nhắc lại trên đàn rồi mở sheet đối chiếu.':'';
      const prompts={EA01:'So sánh hai âm liền nhau: âm sau cao hay thấp?',EA02:'Hai âm liền nhau giống hay khác?',EA03:'Câu nhạc đi lên, đi xuống hay đổi hướng?',EA04:'Nghe cặp nốt: bước liền hay nhảy quãng?',EA10:'Nghe hợp âm: trưởng hay thứ?',EA11:'Hát hoặc tìm nốt gốc của hợp âm.',EA17:'Nghe phần Reference rồi Test nối tiếp: nốt nào đổi?',EA18:'Nghe phần Reference rồi Test nối tiếp: tiết tấu nào đổi?',EA19:'Nhìn sheet, nghe câu nhạc trong đầu rồi chơi; chưa nghe mẫu.',EA20:'Hát câu nhạc rồi tìm lại trên đàn.',CH24:'Nghe hợp âm, tìm lại trên đàn rồi mở sheet đối chiếu.'};
      if(prompts[family.code])$('reading-task-rule').textContent=prompts[family.code];
      if(lesson.isSightReading)$('reading-task-rule').textContent='Quan sát trước, chọn tempo vừa sức rồi chơi một lượt liền mạch. Tối đa thêm một lượt kiểm tra; lượt nghe mẫu được chuyển thành ôn.';
      if(family.code==='LA06')$('reading-task-rule').textContent='Quan sát và hình dung câu nhạc. Bấm “Đã quan sát · giấu sheet” rồi chơi từ trí nhớ đọc vừa hình thành.';
      if(family.code==='LA07')$('reading-task-rule').textContent='Tìm trước các chỗ nhảy quãng, dấu hóa và thay đổi tiết tấu; sau đó chơi liền mạch.';
      $('reading-preview-hide').hidden=family.code!=='LA06';
      $('reading-feedback').textContent=item.status==='done'?'Bài này đã ghi nhận; xem lại không tăng tiến độ.':item.status==='skipped'?'Đã bỏ qua trong buổi; bài vẫn chờ tập ở các lượt sau.':'';
      const unavailable=[...new Set(session.unavailable||[])];
      $('reading-unavailable').textContent=unavailable.length?`Phần chưa đủ bài phù hợp: ${unavailable.map(id=>moduleFor(id).title).join(', ')}. Không lặp bài để tính là bài mới.`:'';
      api.conceal(lesson.conceal);
      if(lesson.conceal==='notation')api.keyboardTarget(variant.staves[0].events.find(e=>e.pitches.length)?.pitches||[]);
      api.navigation(session.cursor>0,session.cursor<session.items.length-1);
      clock();
    }
    function clock(){
      if(!saved.session)return;const elapsed=Math.floor(saved.session.elapsed/1000),minutes=Math.floor(elapsed/60),seconds=elapsed%60;
      $('reading-clock').textContent=`${minutes}:${String(seconds).padStart(2,'0')} / ${saved.session.only?moduleFor(saved.session.only).minutes:45} phút`;
    }
    function finishItem(needsReview){
      if(!$('reading-confirm').checked||!current)return;
      snapshot();const session=saved.session,item=session.items[session.cursor];
      if(item.status!=='done'){const r=record(item.id);r.completed++;r.needsReview=needsReview;item.status='done';item.needsReview=needsReview;}
      advance();
    }
    function advance(){
      const session=saved.session;
      const next=session.items.findIndex((i,index)=>index>session.cursor&&i.status==='pending');
      const previousPending=session.items.findIndex(i=>i.status==='pending');
      if(next>=0){session.cursor=next;persist();open();}
      else if(previousPending>=0){session.cursor=previousPending;persist();open();}
      else{
        session.finished=true;saved.sessions++;saved.previousFamilies=session.items.map(i=>i.family);persist();current=null;api.stop();api.dashboard();render();
      }
    }
    function move(delta){snapshot();if(!saved.session)return;saved.session.cursor=Math.max(0,Math.min(saved.session.items.length-1,saved.session.cursor+delta));open();}
    function beforeStart(mode,atBeginning){
      if(!current)return true;const item=saved.session.items[saved.session.cursor],{family}=variants.get(item.id),r=record(item.id);
      if(mode==='listen'){
        r.heard=true;item.fresh=false;$('reading-kind').textContent='Ôn · đã nghe mẫu';$('reading-kind').dataset.kind='review';
      }else if(family.code.startsWith('SR')&&atBeginning){
        if((item.attempts||0)>=2){$('reading-feedback').textContent='Đã đủ hai lượt đọc. Ghi nhận rồi chuyển bài; bài cần sửa được đưa vào ôn.';return false;}
        item.attempts=(item.attempts||0)+1;r.reads++;$('reading-feedback').textContent=`Lượt đọc ${item.attempts}/2 · tự ghi nhận sau khi chơi.`;
      }
      persist();return true;
    }
    $('reading-start').addEventListener('click',()=>begin());
    $('reading-level').addEventListener('change',()=>{saved.level=Number($('reading-level').value)===1?1:2;persist();render();});
    $('reading-confirm').addEventListener('change',()=>{$('reading-good').disabled=!$('reading-confirm').checked;$('reading-review').disabled=!$('reading-confirm').checked;});
    $('reading-good').addEventListener('click',()=>finishItem(false));$('reading-review').addEventListener('click',()=>finishItem(true));
    $('reading-skip').addEventListener('click',()=>{if(!current)return;snapshot();const item=saved.session.items[saved.session.cursor];if(item.status==='pending')item.status='skipped';advance();});
    $('reading-pause').addEventListener('click',()=>{snapshot();api.stop();current=null;api.dashboard();render();});
    $('reading-reveal').addEventListener('click',()=>{api.stop();api.conceal(null);$('reading-reveal').hidden=true;});
    $('reading-preview-hide').addEventListener('click',()=>{api.conceal('all');$('reading-preview-hide').hidden=true;$('reading-reveal').hidden=false;$('reading-reveal').textContent='Hiện sheet để kiểm tra';});
    window.addEventListener('pagehide',snapshot);
    setInterval(()=>{
      const now=performance.now(),delta=Math.min(now-lastTick,2000);lastTick=now;
      if(current&&saved.session&&!saved.session.finished&&api.active()&&!document.hidden){saved.session.elapsed+=delta;clock();if(Math.floor(saved.session.elapsed/1000)%5===0)persist();}
    },1000);
    return {ready,begin,move,beforeStart,leave(){snapshot();current=null;},snapshot,diagnostics:()=>({ready:!!bank,current,saved:JSON.parse(JSON.stringify(saved))})};
  };
})();
