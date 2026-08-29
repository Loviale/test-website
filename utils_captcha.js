(function () {
    window.Captcha = function (container) {
        var code = '';
        var canvas = document.createElement('canvas');
        canvas.width = 120;
        canvas.height = 40;
        canvas.style.cursor = 'pointer';
        canvas.title = '点击刷新验证码';
        container.appendChild(canvas);

        function generate () {
            var chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz';
            code = '';
            for (var i = 0; i < 6; i++) {
                code += chars.charAt(Math.floor(Math.random() * chars.length));
            }

            var ctx = canvas.getContext('2d');
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = '#f0f0f0';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            for (var d = 0; d < 30; d++) {
                ctx.fillStyle = 'rgba(' +
                    Math.floor(Math.random() * 200) + ',' +
                    Math.floor(Math.random() * 200) + ',' +
                    Math.floor(Math.random() * 200) + ',0.3)';
                ctx.beginPath();
                ctx.arc(
                    Math.random() * canvas.width,
                    Math.random() * canvas.height,
                    Math.random() * 3, 0, Math.PI * 2
                );
                ctx.fill();
            }

            for (var l = 0; l < 4; l++) {
                ctx.strokeStyle = 'rgba(' +
                    Math.floor(Math.random() * 200) + ',' +
                    Math.floor(Math.random() * 200) + ',' +
                    Math.floor(Math.random() * 200) + ',0.4)';
                ctx.beginPath();
                ctx.moveTo(Math.random() * canvas.width, Math.random() * canvas.height);
                ctx.lineTo(Math.random() * canvas.width, Math.random() * canvas.height);
                ctx.stroke();
            }

            var colors = ['#e74c3c', '#2ecc71', '#3498db', '#9b59b6', '#e67e22', '#1abc9c'];
            for (var c = 0; c < code.length; c++) {
                ctx.save();
                ctx.font = 'bold ' + (18 + Math.random() * 6) + 'px Arial';
                ctx.fillStyle = colors[c % colors.length];
                ctx.translate(14 + c * 17, 28 + (Math.random() * 6 - 3));
                ctx.rotate((Math.random() - 0.5) * 0.4);
                ctx.fillText(code[c], 0, 0);
                ctx.restore();
            }
        }

        canvas.addEventListener('click', generate);
        generate();

        return {
            getCode: function () { return code; },
            refresh: generate
        };
    };
})();
