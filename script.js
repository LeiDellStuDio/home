function updateTime() {  
    const now = new Date();  
    const hours = now.getHours();  
    const minutes = now.getMinutes().toString().padStart(2, '0');  
  
    let timePeriod;  
    if (hours < 6) {  
        timePeriod = '凌晨';  
    } else if (hours < 9) {  
        timePeriod = '早上';  
    } else if (hours < 12) {  
        timePeriod = '上午';  
    } else if (hours < 14) {  
        timePeriod = '中午';  
    } else if (hours < 18) {  
        timePeriod = '下午';  
    } else if (hours < 20) {  
        timePeriod = '傍晚';  
    } else if (hours < 23) {  
        timePeriod = '晚上';  
    } else if (hours < 24) {    
        timePeriod = '深夜';  
    }  
  
    // 对于中午和下午，我们可能需要特别处理小时数以符合12小时制习惯  
    let displayHours = hours;  
    if (timePeriod === '中午' || timePeriod === '下午' || timePeriod === '晚上') {  
        displayHours = hours % 12 || 12; // 将下午和晚上的小时数转换为12小时制  
    }  
  
    const timeString = `${timePeriod} ${displayHours}:${minutes}`;  
    document.getElementById('time').innerText = timeString;  
}  
  
// 假设您已经有一个元素来显示时间  
// <div id="time"></div>  
  
// 初始调用updateTime来设置时间，并设置定时器每秒更新一次  
updateTime();  
setInterval(updateTime, 1000);
  
 
// 初始调用  
updateTime();  

document.addEventListener('mousemove', function(event) {  
    const imageContainer = document.getElementById('icon-container');  
    const rect = imageContainer.getBoundingClientRect();  
    const centerX = rect.left + rect.width / 2;  
    const centerY = rect.top + rect.height / 2;  
  
    const mouseX = event.clientX;  
    const mouseY = event.clientY;  
  
    // 计算鼠标与图片中心的距离  
    const distance = Math.sqrt(Math.pow(mouseX - centerX, 2) + Math.pow(mouseY - centerY, 2));  
  
    // 假设当距离小于50px时播放声音  
    if (distance < 5) {  
        const audio = document.getElementById('hoverSound');  
        }  
        audio.play();  
    }  
);
  
  
// 注意：由于浏览器自动播放政策，某些情况下可能需要用户交互（如点击）才能播放音频

function playAudio() {  
    var audio = document.getElementById('hoverSound');  
    audio.play().catch(error => {  
        // 处理播放错误，如提示用户交互  
        console.error("播放失败，可能需要用户交互:", error);  
    });  
}  


document.addEventListener('DOMContentLoaded', function() {  
    fetch('https://v1.hitokoto.cn/')  
        .then(response => response.json())  
        .then(data => {  
            document.getElementById('hitokoto').textContent = data.hitokoto;  
        })  
        .catch(error => {  
            document.getElementById('hitokoto').textContent = '一言获取失败';  
            console.error('一言API获取失败:', error);  
        });  
});


document.querySelectorAll('.dock li').forEach(li => {
    li.addEventListener('click', e => {
      e.currentTarget.classList.add('loading')
    })
    
    li.addEventListener('mousemove', e => {
      let item = e.target
      let itemRect = item.getBoundingClientRect()
      let offset = Math.abs(e.clientX - itemRect.left) / itemRect.width
      
      let prev = item.previousElementSibling || null
      let next = item.nextElementSibling || null
      
      let scale = 0.6
      
      resetScale()
      
      if (prev) {
        prev.style.setProperty('--scale', 1 + scale * Math.abs(offset - 1))
      }
      
      item.style.setProperty('--scale', 1 + scale)
      
      if (next) {
        next.style.setProperty('--scale', 1 + scale * offset)
      }
    })
  })
  
  document.querySelector('.dock').addEventListener('mouseleave', e => {
    resetScale()
  })
  
  function resetScale() {
    document.querySelectorAll('.dock li').forEach(li => {
      li.style.setProperty('--scale', 1)
    })
  }