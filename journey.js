(() => {
  'use strict';
  const _t=globalThis.I18N?.t||((text,args)=>args?text.replace(/\{(\d+)\}/g,(m,i)=>args[i]):text);
  const STORAGE='piano-journey-v1';
  const worlds=[_t('Bước cùng nhau'),_t('Nhịp riêng mỗi tay'),_t('Sắc màu âm thanh'),_t('Giai điệu & phần đệm'),_t('Đường chạy hai tay'),_t('Sân khấu nhỏ'),_t('Tiếng vọng canon'),_t('Phòng blues'),_t('Đổi bánh răng'),_t('Xưởng câu hát')];
  const destinations={melody:_t('Đích đến: để giai điệu của bạn nổi bật trên phần đệm.'),rhythm:_t('Đích đến: giữ phần đệm vững vàng khi giai điệu di chuyển.'),together:_t('Đích đến: chơi hai tay ăn ý và thoải mái.')};
  // Each mission isolates the musical obstacle in its corresponding exercise.
  const missions=[
    [_t('Bước chân song hành'),'rh',_t('Chơi tay phải đều, mỗi phách một nốt.'),_t('Hai tay chạm phím cùng lúc ở từng phách.')],
    [_t('Hai con đường'),'lh',_t('Chơi tay trái đi xuống rồi quay về, không dừng.'),_t('Hai tay đi ngược chiều nhưng vẫn gặp nhau đúng phách.')],
    [_t('Chuyền lượt'),'rh',_t('Chơi tay phải và giữ yên tay trong các dấu nghỉ.'),_t('Chuyền lượt giữa hai tay, không lấp dấu nghỉ.')],
    [_t('Ngọn hải đăng'),'lh',_t('Giữ nốt tay trái đủ bốn phách, không đánh lại giữa ô.'),_t('Giữ tay trái trong khi tay phải đổi từng nốt.')],
    [_t('Đổi người dẫn đường'),'rh',_t('Chơi tay phải: chuyển từ di chuyển sang giữ nốt ở ô 3.'),_t('Đi qua ô 2–3 và đổi tay giữ nền mà không dừng.')],
    [_t('Chiếc đồng hồ đôi'),'lh',_t('Tay trái chỉ đánh ở phách 1 và 3.'),_t('Tay phải đi đều; tay trái không thêm nốt vào phách 2 và 4.')],
    [_t('Đổi chiếc đồng hồ'),'rh',_t('Tay phải chỉ đánh ở phách 1 và 3, giữ đủ trường độ.'),_t('Tay trái đi đều mà không kéo tay phải đánh thêm.')],
    [_t('Hai bước trên một nhịp'),'rh',_t('Đếm “1 và 2 và…” khi chơi tám nốt tay phải.'),_t('Mỗi nốt tay trái trùng nốt đầu của cặp tay phải.')],
    [_t('Động cơ tay trái'),'lh',_t('Chơi tám nốt tay trái đều, không nhanh dần.'),_t('Tay phải giữ bốn phách trong khi tay trái chơi tám nốt.')],
    [_t('Bước giữa nhịp'),'rh',_t('Tay phải chỉ vào dấu “và”; nghỉ ở phách chính.'),_t('Tay trái giữ phách chính, tay phải vào giữa hai phách.')],
    [_t('Dài và ngắn'),'lh',_t('Tay trái đánh ngắt gọn và giữ nhịp đều.'),_t('Nghe rõ tay phải liền, tay trái ngắt.')],
    [_t('Ngắn và dài'),'rh',_t('Tay phải đánh ngắt gọn, không giữ quá lâu.'),_t('Tay phải ngắt nhưng tay trái vẫn giữ liền.')],
    [_t('Giọng hát phía trước'),'rh',_t('Chơi câu tay phải liền mạch, nghe từng nốt.'),_t('Cho tay phải nổi rõ, tay trái làm nền nhẹ.')],
    [_t('Đổi ánh đèn'),'lh',_t('Qua ô 2–3: đổi tay trái từ nền nhẹ thành giọng nổi.'),_t('Đổi lớp âm thanh ở ô 3 mà không đổi tốc độ.')],
    [_t('Hai điểm nhấn'),'lh',_t('Nhấn riêng phách 3 của tay trái.'),_t('Tay phải nhấn phách 1, tay trái nhấn phách 3.')],
    [_t('Giai điệu trên nền hợp âm'),'lh',_t('Đổi hợp âm tay trái đúng đầu ô, không dò từng nốt.'),_t('Giữ câu tay phải liên tục khi tay trái đổi hợp âm.')],
    [_t('Gốc và ngọn'),'lh',_t('Chơi gốc và quãng năm của tay trái đúng nhịp.'),_t('Đổi nền đúng đầu ô mà giai điệu vẫn tiếp tục.')],
    [_t('Dòng nước rải'),'lh',_t('Chơi mẫu 1–5–3–5 đều ở tay trái.'),_t('Tay trái rải đều, tay phải vẫn là câu hát.')],
    [_t('Ba bước valse'),'lh',_t('Đếm 1–2–3 với bass rồi hai hợp âm.'),_t('Giữ ba phách mỗi ô khi ghép giai điệu.')],
    [_t('Giọng hát tay trái'),'lh',_t('Chơi tay trái như một câu hát rõ ràng.'),_t('Tay trái nổi bật hơn phần đệm tay phải.')],
    [_t('Qua cầu ngón tay'),'rh',_t('Đi qua E–F theo hướng dẫn ngón, giữ cổ tay thoải mái.'),_t('Hai tay qua điểm đổi ngón mà nhịp vẫn đều.')],
    [_t('Gặp ở vạch nhịp'),'lh',_t('Chơi tám nốt tay trái đều đến cuối ô.'),_t('Hai tay đi ngược chiều và gặp đúng vạch ô.')],
    [_t('Đổi thế hợp âm'),'rh',_t('Chuyển thế hợp âm tay phải, tìm vị trí trước khi đánh.'),_t('Tay trái giữ nhịp trong khi tay phải đổi thế.')],
    [_t('Vòng quay Alberti'),'lh',_t('Chơi mẫu Alberti đều, nhẹ, không dồn tốc độ.'),_t('Giữ phần đệm nhẹ để giai điệu tay phải nổi lên.')],
    [_t('Bass đi, hợp âm lệch'),'lh',_t('Giữ đường bass tay trái đều ở từng phách.'),_t('Tay phải đặt hợp âm lệch phách mà bass vẫn đều.')],
    [_t('Ba gặp hai'),'lh',_t('Giữ hai nốt tay trái chia đều ô 3 phách.'),_t('Ba nốt tay phải và hai nốt tay trái cùng bắt đầu ô.')],
    [_t('Khoảng trống có nhịp'),'rh',_t('Chơi đúng nốt tay phải và giữ nguyên các dấu nghỉ.'),_t('Đổi hợp âm nhưng không thêm nốt vào khoảng nghỉ.')],
    [_t('Cuộc đối thoại'),'rh',_t('Chơi câu tay phải, chờ đúng lượt ở dấu nghỉ.'),_t('Hai tay đáp lời nhau và giữ đúng chỗ nghỉ.')],
    [_t('Valse hai câu chuyện'),'lh',_t('Giữ nhịp bass–hợp âm–hợp âm ở tay trái.'),_t('Giai điệu móc đơn vẫn nằm trong nhịp valse ba phách.')],
    [_t('Buổi diễn đầu tiên'),'lh',_t('Chơi phần đệm rải đều và nhẹ.'),_t('Giữ phần đệm đều dưới câu giai điệu lệch phách.')]
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
      const labels=lesson.mission?.labels||[_t('Tìm nhịp riêng'),_t('Ghép hai đường'),_t('Chơi trọn màn')];
      const handLabel=finalHand==='both'?'hai tay':finalHand==='rh'?_t('tay phải'):_t('tay trái');
      return {step,settings,label:labels[step],rule:reading?lesson.book.steps[step]:step===0?m[2]:step===1?m[3]:_t("{0} Chơi {1} cả bài từ {2} BPM.",[lesson.pass_rule,handLabel,finalTempo]),finalTempo};
    }
    function renderMap(){
      $('journey-title').textContent=saved.goalChosen?_t('Hành trình của bạn'):_t('Bạn muốn chơi được điều gì?');
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
        const kicker=document.createElement('span');kicker.className='course-kicker';kicker.textContent=_t("{0} {1} · {2} BÀI",[book?_t('PHẦN'):_t('KHÓA'),String(order).padStart(2,'0'),levels.length]);
        const description=document.createElement('span');description.className='course-description';description.textContent=api.data.stages[index][1];
        const progress=document.createElement('span');progress.className='course-progress';progress.style.setProperty('--completion',`${stars/capacity*100}%`);progress.textContent=`${Math.round(stars/capacity*100)}%`;progress.setAttribute('aria-label',_t("{0} trên {1} sao",[stars,capacity]));
        const action=document.createElement('span');action.className='course-action';action.textContent=stars===capacity?_t('CHƠI LẠI'):stars?_t('TIẾP TỤC'):_t('BẮT ĐẦU');
        button.append(kicker,title,description,progress,count,action,number);
        button.addEventListener('click',()=>api.openLesson((levels.find(e=>record(e.id).stars<3)||levels[0]).id));
        $(book?curriculum.mapId:'world-map').append(button);
      });
      const completed=api.data.exercises.filter(e=>record(e.id).stars===3).length;
      $('journey-progress').textContent=_t("{0}/{1} màn hoàn thành · Mọi sao đã nhận đều được giữ.",[completed,api.data.exercises.length]);
      $('journey-resume').textContent=completed===api.data.exercises.length?_t('Chọn một màn để chơi lại →'):_t('Tiếp tục hành trình →');
    }
    function renderQuest(){
      const r=record(lesson.id),current=task(),finished=r.stars===3,m=missionFor(lesson);
      $('quest-location').textContent=lesson.book?.sourceNumber?_t("{0} · Mức {1} · Bài nguồn {2}",[lesson.book.label,lesson.book.chapter,String(lesson.book.sourceNumber).padStart(2,'0')]):_t("Vùng {0} · Màn {1}{2}",[lesson.stage,String(lesson.id).padStart(2,'0'),lesson.id%5===0?_t(' · Cửa thử sức'):'']);
      $('quest-title').textContent=m[0];$('quest-purpose').textContent=lesson.goal;
      $('quest-stars').textContent='★'.repeat(r.stars)+'☆'.repeat(3-r.stars);$('quest-stars').setAttribute('aria-label',_t("{0} trên 3 sao",[r.stars]));
      $('quest-steps').replaceChildren();
      (lesson.mission?.labels||[_t('Tìm nhịp riêng'),_t('Ghép hai đường'),_t('Chơi trọn màn')]).forEach((label,index)=>{
        const li=document.createElement('li');li.className=index<r.stars?'earned':index===r.stars?'current':'';li.textContent=`${index<r.stars?'★':index+1} ${label}`;
        if(index===r.stars)li.setAttribute('aria-current','step');$('quest-steps').append(li);
      });
      $('quest-step-label').textContent=finished?_t('ĐÃ QUA MÀN'):_t("THỬ THÁCH {0} / 3",[current.step+1]);
      $('quest-task').textContent=finished?_t('Bạn đã chinh phục màn này!'):current.label;
      $('quest-rule').textContent=finished?_t("Thử màu sắc mới: {0}",[lesson.variation]):current.rule;
      const setup=active?api.getSettings():current.settings;
      const reading=lesson.book?.activity==='sight-reading';
      $('quest-confirm-text').textContent=reading?[_t('Tôi đã quan sát bản nhạc trước khi chơi.'),_t('Tôi đã chơi một lượt đầu và ghi Trôi/Vấp cùng số lần dừng.'),_t('Tôi đã ghi chỗ cần sửa và kế hoạch ôn; lượt sau là ôn, không tính đọc mới.')][current.step]:lesson.book?_t('Tôi đã tập trên đàn và thực hiện mục tiêu của bước này.'):_t('Tôi đã chơi trên đàn 3 lượt và đạt mục tiêu trên.');
      const repetitions=reading?_t('Một lượt đầu; giữ kết quả riêng.'):lesson.book?_t('Tự kiểm tra theo mục tiêu của bước.'):_t('3 lượt ổn định.');
      $('quest-note').textContent=reading?_t('Quan sát rồi đọc một lượt trước khi nghe mẫu. Tự ghi Trôi/Vấp và số lần dừng; các lượt sau là ôn. Sao ghi nhận việc thực hiện bước, không chứng nhận thị tấu.'):_t('Nghe mẫu, rồi thử trên đàn. Bạn tự kiểm tra mỗi lượt; nghe mẫu không tự nhận sao. Có thể nghỉ và quay lại, sao của bạn vẫn được giữ.');
      $('quest-setup').textContent=finished?_t("Lần đạt gần nhất: {0} BPM.",[r.bestTempo||lesson.bpm]):_t("{0} · Ô {1}–{2} · {3} BPM · {4}",[setup.hand==='both'?'Hai tay':setup.hand==='rh'?_t('Tay phải'):_t('Tay trái'),setup.barStart,setup.barEnd,setup.tempo,repetitions]);
      $('quest-start').hidden=finished;$('quest-start').textContent=active?_t('Đặt lại đoạn thử thách'):r.settings?_t('Tiếp tục thử thách'):_t('Vào thử thách');
      $('quest-easier').hidden=finished;$('quest-easier').disabled=!active||api.getSettings().tempo<=40;
      $('quest-check').hidden=finished;$('quest-next').hidden=!finished;$('quest-replay').hidden=!finished;
      $('quest-confirm').disabled=!active;$('quest-claim').disabled=!active||!$('quest-confirm').checked;
      $('quest-next').textContent=total()===maximum?_t('Tìm màn để chơi lại →'):lesson.id%5===0?_t('Khám phá vùng tiếp theo →'):_t('Màn tiếp theo →');
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
      $('quest-feedback').textContent=_t('Đoạn tập đã sẵn sàng. Bấm Phát để nghe mẫu, rồi chơi trên đàn.');renderQuest();
    }
    function easier(){
      if(!active)return;
      const settings=api.getSettings();settings.tempo=Math.max(40,settings.tempo-4);api.applySettings(settings);rememberSettings();
      $('quest-feedback').textContent=_t("Lùi về {0} BPM để giữ đúng động tác. Sao đã nhận vẫn còn; hãy thử thêm một lượt.",[settings.tempo]);
    }
    function claim(){
      if(!active||!$('quest-confirm').checked)return;
      const current=task(),settings=api.getSettings();
      const covers=settings.barStart<=attempt.barStart&&settings.barEnd>=attempt.barEnd;
      if(settings.hand!==attempt.hand||!covers||(current.step===2&&settings.tempo<current.finalTempo)){
        $('quest-confirm').checked=false;renderQuest();
        $('quest-feedback').textContent=current.step===2?_t("Ngôi sao cuối cần cả bài, đúng tay đã chọn, từ {0} BPM. Bạn có thể luyện chậm trước, rồi tăng tốc khi sẵn sàng.",[current.finalTempo]):_t('Ngôi sao này cần đúng tay và đủ đoạn thử thách. Bấm đặt lại đoạn để quay về nhiệm vụ.');
        return;
      }
      api.stop();const r=record(lesson.id);r.stars++;delete r.settings;r.lastTempo=settings.tempo;
      if(r.stars===3){r.bestTempo=Math.max(r.bestTempo||0,settings.tempo);api.completeLesson(lesson.id);}
      window.pianoAnalytics?.track('star_earned',{lesson_id:lesson.id,collection:lesson.book?.id||'core',stars:r.stars,tempo_bpm:settings.tempo});
      active=false;attempt=null;$('quest-confirm').checked=false;persist();renderMap();renderQuest();api.refreshLessons();
      const labels=lesson.mission?.labels;
      $('quest-feedback').textContent=r.stars===3?(lesson.book?_t('★ Đã hoàn thành bài ngắn. Buổi sau hãy tự kiểm tra lại trước khi nghe mẫu.'):lesson.id===api.data.exercises.at(-1).id?_t('★ Bạn đã hoàn thành toàn bộ hành trình! Chọn một màn yêu thích để chơi lại.'):lesson.id%5===0?_t('★ Đã qua cửa thử sức! Vùng tiếp theo đang chờ bạn.'):_t('★ Đã qua màn! Bạn có thể sang màn tiếp hoặc chơi lại.')):labels?_t("★ Đã ghi nhận. Tiếp theo: {0}.",[labels[r.stars]]):r.stars===1?_t('★ Đã có nhịp riêng. Tiếp theo, ghép hai đường.'):_t('★ Hai tay đã gặp nhau. Khi sẵn sàng, thử chơi trọn màn.');
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
    $('quest-replay').addEventListener('click',()=>{api.applySettings(task().settings);$('quest-feedback').textContent=_t("Chơi lại với biến thể: {0} Sao đã nhận được giữ nguyên.",[lesson.variation]);});
    return {
      showLesson(value){lesson=value;active=false;attempt=null;saved.lastLesson=value.id;persist();$('quest-confirm').checked=false;$('quest-feedback').textContent=record(value.id).settings?_t('Đoạn bạn đang luyện đã được lưu. Tiếp tục khi sẵn sàng.'):'';renderMap();renderQuest();},
      rememberSettings,
      stars:id=>record(id).stars,
      resumeLesson:()=>saved.lastLesson
    };
  };
})();
