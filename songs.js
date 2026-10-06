(() => {
  'use strict';
  const KEY='piano-songs-v1';
  window.createPianoSongs=function(api){
    const $=id=>document.getElementById(id),song=window.PIANO_SONGS[0];
    const fullSong={...song,unfolded:true,barNumbers:song.form,
      rh:song.form.map(n=>song.rh[n-1]),lh:song.form.map(n=>song.lh[n-1]),
      expression:Object.fromEntries(['rhVelocity','lhVelocity'].map(hand=>[hand,song.form.map(n=>song.expression[hand][n-1])]))};
    const groups=Array.from({length:Math.ceil(song.availableBars/4)},(_,i)=>({id:`phrase-${i+1}`,title:`Đoạn ${i+1}`,range:[i*4+1,Math.min(song.availableBars,i*4+4)]}));
    groups.push({id:'join',title:'Nối hai đoạn đầu',range:[1,8],joined:true},
      {id:'full',title:'Toàn bài · theo dấu lặp',range:[1,fullSong.rh.length],joined:true});
    const total=groups.reduce((sum,g)=>sum+(g.joined?1:4),0);
    const steps=[
      {title:'Giữ nền',hand:'lh',tempo:52,rule:'Chơi mẫu đệm tay trái ba lượt đều. Giữ đủ trường độ nốt dài và mẫu nốt đen; chưa dùng pedal.'},
      {title:'Hát câu',hand:'rh',tempo:52,rule:'Chơi riêng giai điệu ba lượt. Giữ nốt dài đủ trường độ và nghe rõ chỗ câu nhạc đi xuống.'},
      {title:'Ghép tay',hand:'both',tempo:44,rule:'Ghép hai tay ba lượt ở tốc độ chậm. Tay trái tiếp tục đều khi tay phải đổi tiết tấu; chưa dùng pedal.'},
      {title:'Chơi liền',hand:'both',tempo:60,rule:'Chơi hết câu ba lượt, không dừng giữa các ô. Giai điệu tay phải nổi hơn phần đệm.'}
    ];
    let saved={completed:[],group:'phrase-1',step:0},active=false;
    const allowed=new Set(groups.flatMap(g=>Array.from({length:g.joined?1:4},(_,i)=>`${g.id}:${i}`)));
    try{
      const value=JSON.parse(localStorage.getItem(KEY)||'null');
      if(value&&Array.isArray(value.completed))saved.completed=[...new Set(value.completed.filter(k=>allowed.has(k)))];
      if(value&&groups.some(g=>g.id===value.group))saved.group=value.group;
      if(value&&Number.isInteger(value.step)&&value.step>=0&&value.step<4)saved.step=value.step;
    }catch(_){}
    const completed=new Set(saved.completed),group=()=>groups.find(g=>g.id===saved.group);
    const key=()=>`${saved.group}:${group().joined?0:saved.step}`;
    const persist=()=>{saved.completed=[...completed];try{localStorage.setItem(KEY,JSON.stringify(saved));}catch(_){}window.dispatchEvent(new CustomEvent('piano-progress-changed'));};
    const currentStep=()=>group().joined?{title:group().title,hand:'both',tempo:60,
      rule:saved.group==='full'?'Chơi ô 1–45, lặp ô 9–39 rồi sang kết 2 (ô 46–47). Giữ nhịp qua các lần chuyển đoạn; tự xác nhận sau khi chơi trên đàn.':'Chơi liền ô 1–8 ba lượt, giữ nhịp qua ô 4–5. Thêm pedal sau khi nhịp đã ổn.'}:steps[saved.step];
    function refreshCheck(){
      if(!active)return;
      const settings=api.settings(),g=group(),step=currentStep();
      const match=settings.hand===step.hand&&settings.barStart===g.range[0]&&settings.barEnd===g.range[1]&&settings.expression==='practice'&&(!settings.pedal||completed.has(key()));
      const done=completed.has(key());
      $('song-claim').disabled=done||!$('song-confirm').checked||!match;
      $('song-claim').textContent=done?'✓ Đã ghi nhận':'Đã chơi ổn ✓';
      $('song-settings-note').textContent=match?'Tự xác nhận sau khi chơi trên đàn; nghe mẫu không tính hoàn thành.':`Đặt lại thử thách để chọn “Luyện nhịp đều”, đúng tay, ô ${g.range.join('–')} và tắt pedal khi ghi nhận lần đầu.`;
    }
    function render(){
      $('song-card-progress').textContent=`${completed.size}/${total} thử thách · ${song.availableBars} ô nhịp`;
      $('song-progress').textContent=`${completed.size}/${total} thử thách đã chơi ổn`;
      $('song-progress-bar').max=total;$('song-progress-bar').value=completed.size;
      if(!active)return;
      const map=$('song-phrases');map.replaceChildren();
      for(const g of groups){
        const b=document.createElement('button');b.type='button';b.setAttribute('aria-pressed',String(g.id===saved.group));
        const count=[...completed].filter(k=>k.startsWith(g.id+':')).length;
        b.textContent=`${g.title} · ô ${g.id==='full'?'1–47, có lặp':g.range.join('–')} · ${count}/${g.joined?1:4}`;
        b.addEventListener('click',()=>{
          saved.group=g.id;saved.step=g.joined?0:[0,1,2,3].find(i=>!completed.has(`${g.id}:${i}`))??3;
          begin();
        });map.append(b);
      }
      const nav=$('song-steps');nav.replaceChildren();
      if(!group().joined)steps.forEach((step,i)=>{
        const b=document.createElement('button');b.type='button';b.textContent=(completed.has(`${saved.group}:${i}`)?'✓ ':'')+step.title;
        b.setAttribute('aria-pressed',String(i===saved.step));b.addEventListener('click',()=>{saved.step=i;begin();});nav.append(b);
      });
      const step=currentStep();
      $('song-task').textContent=`${group().title} · ${step.title}`;
      $('song-rule').textContent=step.rule;
      $('song-confirm').checked=false;refreshCheck();persist();
    }
    function begin(){
      $('song-feedback').textContent='';
      const step=currentStep(),g=group();
      api.open(saved.group==='full'?fullSong:song);
      api.apply({hand:step.hand,barStart:g.range[0],barEnd:g.range[1],tempo:step.tempo,loop:!g.joined&&saved.step!==3,pedal:false,expression:'practice',metronome:true});
      render();
    }
    function open(preview=false){
      api.open(preview?fullSong:song);active=true;render();
      if(preview){
        api.apply({hand:'both',barStart:1,barEnd:fullSong.rh.length,tempo:72,loop:false,pedal:false,expression:'expressive',metronome:false});
        $('song-feedback').textContent='Nghe toàn bài theo dấu lặp, có sắc thái: giai điệu nổi, phần đệm nhẹ, không nhịp gõ. Bấm “Vào thử thách” để luyện nhịp đều.';
        api.play();
      }else begin();
      $('song-practice').scrollIntoView?.({behavior:'smooth',block:'start'});
    }
    $('song-open').addEventListener('click',()=>open());
    $('song-preview').addEventListener('click',()=>open(true));
    $('song-begin').addEventListener('click',begin);
    $('song-confirm').addEventListener('change',refreshCheck);
    $('song-retry').addEventListener('click',()=>{
      const settings=api.settings();api.apply({...settings,pedal:false,tempo:Math.max(40,settings.tempo-4),loop:true,expression:'practice',metronome:true});
      $('song-confirm').checked=false;refreshCheck();$('song-feedback').textContent='Chậm lại 4 BPM và lặp đoạn. Tiến độ đã ghi nhận vẫn được giữ.';
    });
    $('song-claim').addEventListener('click',()=>{
      refreshCheck();if($('song-claim').disabled)return;
      completed.add(key());persist();render();
      $('song-feedback').textContent=completed.size===total?'Bạn đã hoàn thành các đoạn và chơi toàn bài theo dấu lặp. Có thể chơi lại, thêm pedal hoặc tiếp tục các bài luyện hai tay.':'Đã giữ lại bước này. Chọn bước tiếp theo khi bạn sẵn sàng.';
    });
    $('song-back').addEventListener('click',()=>api.back());
    render();
    return {deactivate(){active=false;},refreshCheck};
  };
})();
