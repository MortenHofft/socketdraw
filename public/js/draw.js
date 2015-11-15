window.onerror = function(message, url, lineNumber) {  
        print(message + " " + lineNumber);
        return true;
      }; 
      var h = $(window).height(),
          w = $(window).width(),
          multitplier = 1,
          color = 'white'; 
      var canvas;
      var ctx;
      function print(t) {
        // document.getElementById('output').innerHTML = t;
      } 
      canvas = document.getElementById('c');
      ctx = canvas.getContext('2d');

      var drawMouse = function() {
        var offset = $(canvas).offset();
        var clicked = 0;
        var start = function(e) {
          clicked = 1;
          ctx.beginPath();
          ctx.moveTo(e.pageX, e.pageY);
          socket.emit('draw', {
            type: 'start', 
            x: e.pageX-offset.left, 
            y: e.pageY-offset.top
          });
        };
        var move = function(e) {
            if(clicked){
                ctx.lineTo(e.pageX, e.pageY);
                ctx.strokeStyle = color;
                ctx.lineWidth = 10;
                ctx.stroke();
                socket.emit('draw', {
                  type: 'move', 
                  x: (e.pageX-offset.left)*multitplier, 
                  y: (e.pageY-offset.top)*multitplier
                });
            }
        };
        var stop = function(e) {
            clicked = 0;
        };
        $(canvas).mousedown(start);
        $(canvas).mousemove(move);
        $(canvas).mouseup(stop);
      };

      var drawTouch = function() {
        var offset = $(canvas).offset();
        var start = function(e) {
            print('start');
            var x = e.targetTouches[0].pageX-offset.left;
            var y = e.targetTouches[0].pageY-offset.top;
            ctx.beginPath();  
            ctx.moveTo(x,y);
            socket.emit('draw', {
              type: 'start', 
              x: x*multitplier, 
              y: y*multitplier
            });
        };
        var move = function(e) {
            print('move');
            var x = e.targetTouches[0].pageX-offset.left;
            var y = e.targetTouches[0].pageY-offset.top;
            e.preventDefault();
            ctx.lineTo(x, y);
            ctx.strokeStyle = color;
            ctx.lineWidth = 10;
            ctx.stroke();
            socket.emit('draw', {
              type: 'move', 
              x: x*multitplier, 
              y: y*multitplier
            });
        };
        canvas.addEventListener('touchstart', start, false);
        canvas.addEventListener('touchmove', move, false);
    };

      // setup to trigger drawing on mouse or touch
      drawMouse();
      drawTouch();

      var socket = io();

      var sizeData = undefined;
      function resizeCanvas() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        canvas.width = w;
        var ratio = sizeData.height / sizeData.width;
        canvas.height = w*ratio;
        multitplier = sizeData.width / w;
      }
      socket.on('resize', function(data){
        sizeData = data;
        resizeCanvas();
      });

      function resize()
      {
        console.log('test');
        h = $(window).height(),
        w = $(window).width();
        if (typeof sizeData !== 'undefined') resizeCanvas()
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
      window.onresize = resize;

      function clear(){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        socket.emit('draw', {
              type: 'clear'
            });
      }
      $('.clear').click(clear);

      $('.red').click(function(){
        color = 'red';
        socket.emit('draw', {
          type: 'color',
          color: color
        });
      });

      $('.white').click(function(){
        color = 'white';
        socket.emit('draw', {
          type: 'color',
          color: color
        });
      });