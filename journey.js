(() => {
  'use strict';
  const STORAGE='piano-journey-v1';
  const worlds=['Bước cùng nhau','Nhịp riêng mỗi tay','Sắc màu âm thanh','Giai điệu & phần đệm','Đường chạy hai tay','Sân khấu nhỏ','Tiếng vọng canon','Phòng blues','Đổi bánh răng','Xưởng câu hát'];
  const destinations={melody:'Đích đến: để giai điệu của bạn nổi bật trên phần đệm.',rhythm:'Đích đến: giữ phần đệm vững vàng khi giai điệu di chuyển.',together:'Đích đến: chơi hai tay ăn ý và thoải mái.'};
  // Each mission isolates the musical obstacle in its corresponding exercise.
  const missions=[
    ['Bước chân song hành','rh','Chơi tay phải đều, mỗi phách một nốt.','Hai tay chạm phím cùng lúc ở từng phách.'],
    ['Hai con đường','lh','Chơi tay trái đi xuống rồi quay về, không dừng.','Hai tay đi ngược chiều nhưng vẫn gặp nhau đúng phách.'],
    ['Chuyền lượt','rh','Chơi tay phải và giữ yên tay trong các dấu nghỉ.','Chuyền lượt giữa hai tay, không lấp dấu nghỉ.'],
    ['Ngọn hải đăng','lh','Giữ nốt tay trái đủ bốn phách, không đánh lại giữa ô.','Giữ tay trái trong khi tay phải đổi từng nốt.'],
    ['Đổi người dẫn đường','rh','Chơi tay phải: chuyển từ di chuyển sang giữ nốt ở ô 3.','Đi qua ô 2–3 và đổi tay giữ nền mà không dừng.'],
    ['Chiếc đồng hồ đôi','lh','Tay trái chỉ đánh ở phách 1 và 3.','Tay phải đi đều; tay trái không thêm nốt vào phách 2 và 4.'],
    ['Đổi chiếc đồng hồ','rh','Tay phải chỉ đánh ở phách 1 và 3, giữ đủ trường độ.','Tay trái đi đều mà không kéo tay phải đánh thêm.'],
    ['Hai bước trên một nhịp','rh','Đếm “1 và 2 và…” khi chơi tám nốt tay phải.','Mỗi nốt tay trái trùng nốt đầu của cặp tay phải.'],
    ['Động cơ tay trái','lh','Chơi tám nốt tay trái đều, không nhanh dần.','Tay phải giữ bốn phách trong khi tay trái chơi tám nốt.'],
    ['Bước giữa nhịp','rh','Tay phải chỉ vào dấu “và”; nghỉ ở phách chính.','Tay trái giữ phách chính, tay phải vào giữa hai phách.'],
    ['Dài và ngắn','lh','Tay trái đánh ngắt gọn và giữ nhịp đều.','Nghe rõ tay phải liền, tay trái ngắt.'],
    ['Ngắn và dài','rh','Tay phải đánh ngắt gọn, không giữ quá lâu.','Tay phải ngắt nhưng tay trái vẫn giữ liền.'],
    ['Giọng hát phía trước','rh','Chơi câu tay phải liền mạch, nghe từng nốt.','Cho tay phải nổi rõ, tay trái làm nền nhẹ.'],
    ['Đổi ánh đèn','lh','Qua ô 2–3: đổi tay trái từ nền nhẹ thành giọng nổi.','Đổi lớp âm thanh ở ô 3 mà không đổi tốc độ.'],
    ['Hai điểm nhấn','lh','Nhấn riêng phách 3 của tay trái.','Tay phải nhấn phách 1, tay trái nhấn phách 3.'],
    ['Giai điệu trên nền hợp âm','lh','Đổi hợp âm tay trái đúng đầu ô, không dò từng nốt.','Giữ câu tay phải liên tục khi tay trái đổi hợp âm.'],
    ['Gốc và ngọn','lh','Chơi gốc và quãng năm của tay trái đúng nhịp.','Đổi nền đúng đầu ô mà giai điệu vẫn tiếp tục.'],
    ['Dòng nước rải','lh','Chơi mẫu 1–5–3–5 đều ở tay trái.','Tay trái rải đều, tay phải vẫn là câu hát.'],
    ['Ba bước valse','lh','Đếm 1–2–3 với bass rồi hai hợp âm.','Giữ ba phách mỗi ô khi ghép giai điệu.'],
    ['Giọng hát tay trái','lh','Chơi tay trái như một câu hát rõ ràng.','Tay trái nổi bật hơn phần đệm tay phải.'],
    ['Qua cầu ngón tay','rh','Đi qua E–F theo hướng dẫn ngón, giữ cổ tay thoải mái.','Hai tay qua điểm đổi ngón mà nhịp vẫn đều.'],
    ['Gặp ở vạch nhịp','lh','Chơi tám nốt tay trái đều đến cuối ô.','Hai tay đi ngược chiều và gặp đúng vạch ô.'],
    ['Đổi thế hợp âm','rh','Chuyển thế hợp âm tay phải, tìm vị trí trước khi đánh.','Tay trái giữ nhịp trong khi tay phải đổi thế.'],
    ['Vòng quay Alberti','lh','Chơi mẫu Alberti đều, nhẹ, không dồn tốc độ.','Giữ phần đệm nhẹ để giai điệu tay phải nổi lên.'],
    ['Bass đi, hợp âm lệch','lh','Giữ đường bass tay trái đều ở từng phách.','Tay phải đặt hợp âm lệch phách mà bass vẫn đều.'],
    ['Ba gặp hai','lh','Giữ hai nốt tay trái chia đều ô 3 phách.','Ba nốt tay phải và hai nốt tay trái cùng bắt đầu ô.'],
    ['Khoảng trống có nhịp','rh','Chơi đúng nốt tay phải và giữ nguyên các dấu nghỉ.','Đổi hợp âm nhưng không thêm nốt vào khoảng nghỉ.'],
    ['Cuộc đối thoại','rh','Chơi câu tay phải, chờ đúng lượt ở dấu nghỉ.','Hai tay đáp lời nhau và giữ đúng chỗ nghỉ.'],
    ['Valse hai câu chuyện','lh','Giữ nhịp bass–hợp âm–hợp âm ở tay trái.','Giai điệu móc đơn vẫn nằm trong nhịp valse ba phách.'],
    ['Buổi diễn đầu tiên','lh','Chơi phần đệm rải đều và nhẹ.','Giữ phần đệm đều dưới câu giai điệu lệch phách.']
  ];
  window.createPianoJourney=function(api){
    const $=id=>document.getElementById(id);
    let saved={destination:'together',goalChosen:false,lessons:{},lastLesson:1};
    try{
      const parsed=JSON.parse(localStorage.getItem(STORAGE)||'null');
      if(parsed&&typeof parsed==='object'){
        if(destinations[parsed.destination])saved.destination=parsed.destination;
        saved.goalChosen=parsed.goalChosen===true;
        if(parsed.lessons&&typeof parsed.lessons==='object'&&!Array.isArray(parsed.lessons))saved.lessons=parsed.lessons;
        if(api.data.exercises.some(e=>e.id===parsed.lastLesson))saved.lastLesson=parsed.lastLesson;
      }
    }catch(_){}
    $('journey-map').open=!saved.goalChosen;
    let lesson=null,active=false,attempt=null;
    const record=id=>{
      const old=saved.lessons[id];
      const stars=old&&Number.isInteger(old.stars)?Math.max(0,Math.min(3,old.stars)):0;
      if(!old||old.stars!==stars)saved.lessons[id]={stars};
      return saved.lessons[id];
    };
    const persist=()=>{try{localStorage.setItem(STORAGE,JSON.stringify(saved));}catch(_){}window.dispatchEvent(new CustomEvent('piano-progress-changed'));};
    const maximum=api.data.exercises.length*3;
    const missionFor=e=>e.mission?[e.mission.title,e.mission.hand,e.mission.solo,e.mission.duo]:missions[e.id-1];
    const total=()=>api.data.exercises.reduce((n,e)=>n+record(e.id).stars,0);
    function validSettings(value){
      return value&&['rh','lh','both'].includes(value.hand)&&Number.isInteger(value.barStart)&&Number.isInteger(value.barEnd)&&value.barStart>=1&&value.barEnd<=lesson.rh.length&&value.barStart<=value.barEnd&&Number.isFinite(value.tempo)&&value.tempo>=40&&value.tempo<=120&&typeof value.loop==='boolean';
    }
    function task(){
      const step=Math.min(record(lesson.id).stars,2),m=missionFor(lesson);
      const transition=lesson.id===5||lesson.id===14;
      const [from,to]=lesson.mission?.range||(transition?[2,3]:[1,2]);
      const reading=lesson.book?.activity==='sight-reading';
      const finalTempo=reading?40:Number(lesson.mission?.finalTempo??lesson.pass_rule.match(/(\d+) BPM/)?.[1]??lesson.bpm);
      const slow=Math.max(40,lesson.bpm-8);
      const finalHand=lesson.mission?.finalHand||'both',duoHand=lesson.mission?.duoHand||'both';
      const [duoFrom,duoTo]=lesson.mission?.duoRange||[from,to];
      const settings=step===0?{hand:m[1],barStart:from,barEnd:to,tempo:slow,loop:true}:step===1?{hand:duoHand,barStart:duoFrom,barEnd:duoTo,tempo:slow,loop:true}:{hand:finalHand,barStart:1,barEnd:lesson.rh.length,tempo:lesson.mission?.finalBpm||finalTempo,loop:false};
      if(reading){settings.loop=false;settings.barStart=1;settings.barEnd=4;settings.tempo=lesson.bpm;}
      const labels=lesson.mission?.labels||['Tìm nhịp riêng','Ghép hai đường','Chơi trọn màn'];
      const handLabel=finalHand==='both'?'hai tay':finalHand==='rh'?'tay phải':'tay trái';
      return {step,settings,label:labels[step],rule:reading?lesson.book.steps[step]:step===0?m[2]:step===1?m[3]:`${lesson.pass_rule} Chơi ${handLabel} cả bài từ ${finalTempo} BPM.`,finalTempo};
    }
    function renderMap(){
      $('journey-title').textContent=saved.goalChosen?'Hành trình của bạn':'Bạn muốn chơi được điều gì?';
      $('journey-total').textContent=`★ ${total()} / ${maximum}`;
      document.querySelectorAll('[data-destination]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.destination===saved.destination)));
      $('destination-note').textContent=destinations[saved.destination];
      $('world-map').replaceChildren();
      const curricula=api.data.bookCurricula||(api.data.bookCurriculum?[{...api.data.bookCurriculum,mapId:'book-course-map'}]:[]);
      for(const id of ['book-course-map','book2-course-map','chords24-course-map','pieces18-course-map'])$(id).replaceChildren();
      api.data.stages.forEach(([stageName],index)=>{
        const levels=api.data.exercises.filter(e=>e.stage===index+1);
        if(!levels.length)return;
        const curriculum=curricula.find(c=>c.id===levels[0].book?.id),book=!!curriculum;
        const order=book?index-curriculum.firstStage+2:index+1;
        const name=book?stageName:worlds[index]||stageName;
        const stars=levels.reduce((n,e)=>n+record(e.id).stars,0),capacity=levels.length*3;
        const button=document.createElement('button');button.type='button';button.className='world course-card '+((book?[2,5,7].includes(order):[2,3,5,7,9].includes(index))?'course-pink':'course-blue')+(lesson?.stage===index+1?' current':'')+(stars===capacity?' cleared':'');
        button.setAttribute('aria-current',lesson?.stage===index+1?'step':'false');
        button.dataset.stage=index+1;
        const number=document.createElement('span');number.className='world-number';number.textContent=stars===capacity?'✓':String(order);
        const title=document.createElement('strong');title.textContent=name;
        const count=document.createElement('small');count.textContent=`★ ${stars}/${capacity}`;
        const kicker=document.createElement('span');kicker.className='course-kicker';kicker.textContent=`${book?'PHẦN':'KHÓA'} ${String(order).padStart(2,'0')} · ${levels.length} BÀI`;
        const description=document.createElement('span');description.className='course-description';description.textContent=api.data.stages[index][1];
        const progress=document.createElement('span');progress.className='course-progress';progress.style.setProperty('--completion',`${stars/capacity*100}%`);progress.textContent=`${Math.round(stars/capacity*100)}%`;progress.setAttribute('aria-label',`${stars} trên ${capacity} sao`);
        const action=document.createElement('span');action.className='course-action';action.textContent=stars===capacity?'CHƠI LẠI':stars?'TIẾP TỤC':'BẮT ĐẦU';
        button.append(kicker,title,description,progress,count,action,number);
        button.addEventListener('click',()=>api.openLesson((levels.find(e=>record(e.id).stars<3)||levels[0]).id));
        $(book?curriculum.mapId:'world-map').append(button);
      });
      const completed=api.data.exercises.filter(e=>record(e.id).stars===3).length;
      $('journey-progress').textContent=`${completed}/${api.data.exercises.length} màn hoàn thành · Mọi sao đã nhận đều được giữ.`;
      $('journey-resume').textContent=completed===api.data.exercises.length?'Chọn một màn để chơi lại →':'Tiếp tục hành trình →';
    }
    function renderQuest(){
      const r=record(lesson.id),current=task(),finished=r.stars===3,m=missionFor(lesson);
      $('quest-location').textContent=lesson.book?.sourceNumber?`${lesson.book.label} · Mức ${lesson.book.chapter} · Bài nguồn ${String(lesson.book.sourceNumber).padStart(2,'0')}`:`Vùng ${lesson.stage} · Màn ${String(lesson.id).padStart(2,'0')}${lesson.id%5===0?' · Cửa thử sức':''}`;
      $('quest-title').textContent=m[0];$('quest-purpose').textContent=lesson.goal;
      $('quest-stars').textContent='★'.repeat(r.stars)+'☆'.repeat(3-r.stars);$('quest-stars').setAttribute('aria-label',`${r.stars} trên 3 sao`);
      $('quest-steps').replaceChildren();
      (lesson.mission?.labels||['Tìm nhịp riêng','Ghép hai đường','Chơi trọn màn']).forEach((label,index)=>{
        const li=document.createElement('li');li.className=index<r.stars?'earned':index===r.stars?'current':'';li.textContent=`${index<r.stars?'★':index+1} ${label}`;
        if(index===r.stars)li.setAttribute('aria-current','step');$('quest-steps').append(li);
      });
      $('quest-step-label').textContent=finished?'ĐÃ QUA MÀN':`THỬ THÁCH ${current.step+1} / 3`;
      $('quest-task').textContent=finished?'Bạn đã chinh phục màn này!':current.label;
      $('quest-rule').textContent=finished?`Thử màu sắc mới: ${lesson.variation}`:current.rule;
      const setup=active?api.getSettings():current.settings;
      const reading=lesson.book?.activity==='sight-reading';
      $('quest-confirm-text').textContent=reading?['Tôi đã quan sát bản nhạc trước khi chơi.','Tôi đã chơi một lượt đầu và ghi Trôi/Vấp cùng số lần dừng.','Tôi đã ghi chỗ cần sửa và kế hoạch ôn; lượt sau là ôn, không tính đọc mới.'][current.step]:lesson.book?'Tôi đã tập trên đàn và thực hiện mục tiêu của bước này.':'Tôi đã chơi trên đàn 3 lượt và đạt mục tiêu trên.';
      const repetitions=reading?'Một lượt đầu; giữ kết quả riêng.':lesson.book?'Tự kiểm tra theo mục tiêu của bước.':'3 lượt ổn định.';
      $('quest-note').textContent=reading?'Quan sát rồi đọc một lượt trước khi nghe mẫu. Tự ghi Trôi/Vấp và số lần dừng; các lượt sau là ôn. Sao ghi nhận việc thực hiện bước, không chứng nhận thị tấu.':'Nghe mẫu, rồi thử trên đàn. Bạn tự kiểm tra mỗi lượt; nghe mẫu không tự nhận sao. Có thể nghỉ và quay lại, sao của bạn vẫn được giữ.';
      $('quest-setup').textContent=finished?`Lần đạt gần nhất: ${r.bestTempo||lesson.bpm} BPM.`:`${setup.hand==='both'?'Hai tay':setup.hand==='rh'?'Tay phải':'Tay trái'} · Ô ${setup.barStart}–${setup.barEnd} · ${setup.tempo} BPM · ${repetitions}`;
      $('quest-start').hidden=finished;$('quest-start').textContent=active?'Đặt lại đoạn thử thách':r.settings?'Tiếp tục thử thách':'Vào thử thách';
      $('quest-easier').hidden=finished;$('quest-easier').disabled=!active||api.getSettings().tempo<=40;
      $('quest-check').hidden=finished;$('quest-next').hidden=!finished;$('quest-replay').hidden=!finished;
      $('quest-confirm').disabled=!active;$('quest-claim').disabled=!active||!$('quest-confirm').checked;
      $('quest-next').textContent=total()===maximum?'Tìm màn để chơi lại →':lesson.id%5===0?'Khám phá vùng tiếp theo →':'Màn tiếp theo →';
    }
    function rememberSettings(){
      if(!lesson||!active)return;
      record(lesson.id).settings=api.getSettings();persist();$('quest-confirm').checked=false;renderQuest();
    }
    function begin(){
      if(!lesson||record(lesson.id).stars===3)return;
      const r=record(lesson.id),current=task();
      const restore=active?{...current.settings,tempo:api.getSettings().tempo}:validSettings(r.settings)?r.settings:current.settings;
      api.applySettings(restore);active=true;attempt={...current.settings};
      r.settings={...restore};persist();$('quest-confirm').checked=false;
      $('quest-feedback').textContent='Đoạn tập đã sẵn sàng. Bấm Phát để nghe mẫu, rồi chơi trên đàn.';renderQuest();
    }
    function easier(){
      if(!active)return;
      const settings=api.getSettings();settings.tempo=Math.max(40,settings.tempo-4);api.applySettings(settings);rememberSettings();
      $('quest-feedback').textContent=`Lùi về ${settings.tempo} BPM để giữ đúng động tác. Sao đã nhận vẫn còn; hãy thử thêm một lượt.`;
    }
    function claim(){
      if(!active||!$('quest-confirm').checked)return;
      const current=task(),settings=api.getSettings();
      const covers=settings.barStart<=attempt.barStart&&settings.barEnd>=attempt.barEnd;
      if(settings.hand!==attempt.hand||!covers||(current.step===2&&settings.tempo<current.finalTempo)){
        $('quest-confirm').checked=false;renderQuest();
        $('quest-feedback').textContent=current.step===2?`Ngôi sao cuối cần cả bài, đúng tay đã chọn, từ ${current.finalTempo} BPM. Bạn có thể luyện chậm trước, rồi tăng tốc khi sẵn sàng.`:'Ngôi sao này cần đúng tay và đủ đoạn thử thách. Bấm đặt lại đoạn để quay về nhiệm vụ.';
        return;
      }
      api.stop();const r=record(lesson.id);r.stars++;delete r.settings;r.lastTempo=settings.tempo;
      if(r.stars===3){r.bestTempo=Math.max(r.bestTempo||0,settings.tempo);api.completeLesson(lesson.id);}
      window.pianoAnalytics?.track('star_earned',{lesson_id:lesson.id,collection:lesson.book?.id||'core',stars:r.stars,tempo_bpm:settings.tempo});
      active=false;attempt=null;$('quest-confirm').checked=false;persist();renderMap();renderQuest();api.refreshLessons();
      const labels=lesson.mission?.labels;
      $('quest-feedback').textContent=r.stars===3?(lesson.book?'★ Đã hoàn thành bài ngắn. Buổi sau hãy tự kiểm tra lại trước khi nghe mẫu.':lesson.id===api.data.exercises.at(-1).id?'★ Bạn đã hoàn thành toàn bộ hành trình! Chọn một màn yêu thích để chơi lại.':lesson.id%5===0?'★ Đã qua cửa thử sức! Vùng tiếp theo đang chờ bạn.':'★ Đã qua màn! Bạn có thể sang màn tiếp hoặc chơi lại.'):labels?`★ Đã ghi nhận. Tiếp theo: ${labels[r.stars]}.`:r.stars===1?'★ Đã có nhịp riêng. Tiếp theo, ghép hai đường.':'★ Hai tay đã gặp nhau. Khi sẵn sàng, thử chơi trọn màn.';
    }
    function next(){
      const remaining=api.data.exercises.filter(e=>record(e.id).stars<3);
      const next=remaining.find(e=>e.id>lesson.id)||remaining[0]||api.data.exercises[(lesson.id)%api.data.exercises.length];
      api.openLesson(next.id);
    }
    document.querySelectorAll('[data-destination]').forEach(b=>b.addEventListener('click',()=>{saved.destination=b.dataset.destination;saved.goalChosen=true;$('journey-map').open=false;persist();renderMap();}));
    $('quest-start').addEventListener('click',begin);$('quest-easier').addEventListener('click',easier);
    $('quest-confirm').addEventListener('change',renderQuest);$('quest-claim').addEventListener('click',claim);
    $('quest-next').addEventListener('click',next);$('journey-resume').addEventListener('click',()=>api.openLesson(saved.lastLesson));
    // Replay keeps earned stars and provides a free-play setup without awarding duplicates.
    $('quest-replay').addEventListener('click',()=>{api.applySettings(task().settings);$('quest-feedback').textContent=`Chơi lại với biến thể: ${lesson.variation} Sao đã nhận được giữ nguyên.`;});
    return {
      showLesson(value){lesson=value;active=false;attempt=null;saved.lastLesson=value.id;persist();$('quest-confirm').checked=false;$('quest-feedback').textContent=record(value.id).settings?'Đoạn bạn đang luyện đã được lưu. Tiếp tục khi sẵn sàng.':'';renderMap();renderQuest();},
      rememberSettings,
      stars:id=>record(id).stars,
      resumeLesson:()=>saved.lastLesson
    };
  };
})();
