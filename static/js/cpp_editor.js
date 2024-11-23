document.addEventListener('DOMContentLoaded', function() {
    // 代码编辑器行号
    const codeArea = document.getElementById('codeArea');
    const lineNumbers = document.querySelector('.line-numbers');

    function updateLineNumbers() {
        const lines = codeArea.value.split('\n');
        const lineCount = lines.length;
        const numbers = Array(lineCount).fill(0).map((_, i) => i + 1).join('<br>');
        lineNumbers.innerHTML = numbers;
        
        // 同步滚动位置
        lineNumbers.scrollTop = codeArea.scrollTop;
        
        // 计算实际行高并同步
        const lineHeight = parseInt(window.getComputedStyle(codeArea).lineHeight);
        
        // 设置行号容器的高度与文本区域一致
        lineNumbers.style.height = codeArea.clientHeight + 'px';
        lineNumbers.style.lineHeight = lineHeight + 'px';
    }

    // 监听输入和滚动事件
    codeArea.addEventListener('input', updateLineNumbers);
    codeArea.addEventListener('scroll', () => {
        lineNumbers.scrollTop = codeArea.scrollTop;
    });
    
    // 监听键盘事件，特别处理回车键
    codeArea.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            setTimeout(updateLineNumbers, 0);
        }
    });

    // 监听窗口大小变化
    window.addEventListener('resize', updateLineNumbers);

    // 初始化行号
    updateLineNumbers();

    // 绘图功能
    const canvas = document.getElementById('drawingCanvas');
    const ctx = canvas.getContext('2d');
    const clearBtn = document.getElementById('clearCanvas');
    const colorPicker = document.getElementById('colorPicker');
    let isDrawing = false;

    // 设置画布尺寸
    function resizeCanvas() {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // 绘图事件
    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseout', stopDrawing);

    function startDrawing(e) {
        isDrawing = true;
        draw(e);
    }

    function draw(e) {
        if (!isDrawing) return;
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        ctx.lineWidth = 2;
        ctx.lineCap = 'round';
        ctx.strokeStyle = colorPicker.value;
        ctx.lineTo(x, y);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(x, y);
    }

    function stopDrawing() {
        isDrawing = false;
        ctx.beginPath();
    }

    clearBtn.addEventListener('click', () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    });
}); 