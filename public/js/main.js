$(function() {
  var arrAnimals = ["ant","bird"," cat","chicken","cow","dog","elephant","fish","fox","horse","kangaroo","lion","monkey","penguin","pig","rabbit","sheep","tiger","whale","wolf","zebra"],
      a,b,
      readerTimerScroll = true,
      readerScrollTop = 0,
      scrollSpeed = 100, //scroll speed readerStyle-Two
      readerScrollAutoDown = 0,
      defaultRoomName = ""; // set a default roomname.
  function token() {
    if(localStorage.getItem("token170103") !== null && localStorage.getItem("token170103") != "")
    {
      b = localStorage.getItem('token170103');
      return b;
    }else{
      if(defaultRoomName == ""){
        var randAnimal = arrAnimals[Math.floor(Math.random() * arrAnimals.length)].toLowerCase();
        var number = Math.floor(Math.random() * 1000) + 1;
    	  return randAnimal +""+ number;
      }else {
    	  return defaultRoomName;
      }

    }
  }
  $('#room').val(token);
  if(localStorage.getItem("design170103") !== null || localStorage.getItem("design170103") != null)
  {
    a = localStorage.getItem('design170103');
    $("body").removeAttr('class').addClass(a);
  }
  $("button.sectionNavigation").click(function(e){
    e.preventDefault();
    u = $(this).attr('href');
    b = $("#room").val();
    if(u == "#readerScreen"|| u == "#writerScreen" || u == "#firstScreen")
    {
      $("#firstScreen,#readerScreen,#writerScreen").addClass('hidden');
      $(u).removeClass('hidden');
    }
    if(u == "#readerScreen"){
      $('#varCss').attr('href', 'css/reader.min.css');
    }else if(u== "#writerScreen"){
      $('#varCss').attr('href', 'css/writer.min.css');
    }else if(u== "#firstScreen"){
      $('#varCss').attr('href', 'css/main.min.css');
    }else if(u == "#save"){
      a = $("body").attr('class');
      localStorage.setItem('design170103', a);
      localStorage.setItem('token170103', b);
    }else if(u == "#reset"){
      $("body").removeAttr('class').addClass('font-color-primary background-color-primary font-family-secundary readerStyle-One text-weight-regular text-transform-normal');
      a = $("body").attr('class');
      localStorage.setItem('design170103', a);
      localStorage.setItem('token170103', "");
    }else if(u == "#alertClose"){
      $(".alert").hide();
    }else if(u == "#uploadpage"){
      $(".uploadpage").show();
    }else if(u == "#uploadClose"){
      $(".uploadpage").hide();
    }else if(u == "#mainScreenOptions"){
      $(".mainScreenOptions").show();
      $("html").addClass("no-scroll");
    }else if(u == "#mainScreenOptionsClose"){
      $(".mainScreenOptions").hide();
      $("html").removeClass("no-scroll");
    }else if(u == "#mainScreenHelp"){
      $(".mainScreenHelp").show();
      $("html").addClass("no-scroll");
    }else if(u == "#mainScreenHelpClose"){
      $(".mainScreenHelp").hide();
      $("html").removeClass("no-scroll");
    }else if(u == "#readerScreenInfo"){
      $(".readerScreenInfo").show();
      $("html").addClass("no-scroll");
    }else if(u == "#readerScreenInfoClose"){
      $(".readerScreenInfo").hide();
      $("html").removeClass("no-scroll");
    }else if(u == "#writerScreenInfo"){
      $(".writerScreenInfo").show();
      $("html").addClass("no-scroll");
    }else if(u == "#writerScreenInfoClose"){
      $(".writerScreenInfo").hide();
      $("html").removeClass("no-scroll");
    }else if(u == "#uploadButton"){
      if (!window.FileReader) {
          alert('Your browser is not supported')
      }
      var input = $('#file').get(0);

      // Create a reader object
      var reader = new FileReader();
      if (input.files.length) {
          var textFile = input.files[0];
          reader.readAsText(textFile);
          $(reader).on('load', processFile);
          $(".uploadpage").hide();
      } else {
          alert('Please upload a file before continuing')
      }
    }else if(u == "#downloadButton"){
      download('DigitalAutocue',collectAndPullText());
    } else {
      console.log(u + ": There was a button that won't work, Report to the developer");
      alert(u + ": Report to developer");
    }
  });
  function download(filename, text)
  {
    var d = new Date();
    filename = filename + "_" + d.toLocaleDateString() + "_" + d.getHours() + "-" + d.getMinutes() + "-" + d.getSeconds() + ".txt";
    var element = document.createElement("a");
    element.setAttribute('href', "data:text/plain;charset=utf-8," + encodeURIComponent(text));
    element.setAttribute('download',filename);

    element.style.display = "none";
    document.body.appendChild(element);

    element.click();
    document.body.removeChild(element);
  }
  function collectAndPullText(){
    var text = "", container;
    container = document.getElementById('messageWriter').getElementsByTagName('p');
    for (var i = 2, len = container.length; i < len; i++)
    {
      text += container[i].innerHTML + "\n";
    }
    return text;
  }
  function processFile(e) {
      var file = e.target.result,
          results;
      if (file && file.length) {
          results = file.split("\n");
          for (index = 0, len = results.length; index < len; ++index) {
            socket.emit('chat message', { room: room, msg: results[index]});
          }
      }
  }

  $('.navigation').click(function(e){
    if($(this).hasClass('previous')){
      $('.part2,.navigation.previous').addClass('hidden');
      $('.part1,.navigation.next').removeClass('hidden');
    }else if($(this).hasClass('next')){
      $('.part1,.navigation.next').addClass('hidden');
      $('.part2,.navigation.previous').removeClass('hidden');
    }
  });

  $(".dropdown-content a").click(function(e){
    e.preventDefault();
    var a = $(this).data('href');
    if (a.match("^font-color-*")) {
      $("body[class*='font-color-']").removeClass (function (index, css) {
         return (css.match (/(^|\s)font-color-\S+/g) || []).join(' ');
      });
    }else if (a.match("^background-color-*")) {
      $("body[class*='background-color-']").removeClass (function (index, css) {
         return (css.match (/(^|\s)background-color-\S+/g) || []).join(' ');
      });
    }else if (a.match("^font-family-*")) {
      $("body[class*='font-family-']").removeClass (function (index, css) {
         return (css.match (/(^|\s)font-family-\S+/g) || []).join(' ');
      });
    }else if (a.match("^readerStyle-*")) {
      $("body[class*='readerStyle-']").removeClass (function (index, css) {
         return (css.match (/(^|\s)readerStyle-\S+/g) || []).join(' ');
      });
    }else if (a.match("^text-weight-*")) {
      $("body[class*='text-weight-']").removeClass (function (index, css) {
         return (css.match (/(^|\s)text-weight-\S+/g) || []).join(' ');
      });
    }else if (a.match("^text-transform-*")) {
      $("body[class*='text-transform-']").removeClass (function (index, css) {
         return (css.match (/(^|\s)text-transform-\S+/g) || []).join(' ');
      });
    }

    $('body').addClass(a);
  });
  var readPosition = 0;
  $(document).keydown(function(e) {
    //Alert
    if(!$('#readerScreen').hasClass("hidden")){
      e.preventDefault();
      switch(e.which) {
          //alert
          case 13: // return
            socket.emit('controlls', { room: room, msg: "alert",msgextra: null});
          break;
      }
    }
    //readerStyle-One
    if(!$('#readerScreen').hasClass("hidden") && $("body").hasClass("readerStyle-One")){
      e.preventDefault();
      switch(e.which) {
          case 65: // character a
          case 81: // character q
          case 70: // character f
          case 37: // left
          case 38: // up
            if(readPosition != "0"){
              readPosition--;
            }
            socket.emit('controlls', { room: room, msg: "position",msgextra: readPosition});
          break;

          case 69: // character e
          case 68: // character d
          case 74: // character j
          case 39: // right
          case 40: // down
          case 32: // spacebar
            if(readPosition != ($(".messagesRead div").length - 1)){
              readPosition++;
            }
            socket.emit('controlls', { room: room, msg: "position",msgextra: readPosition});
          break;

          default: return; // exit this handler for other keys
      }
    }
    //readerStyle-Two
    else if(!$('#readerScreen').hasClass("hidden") && $("body").hasClass("readerStyle-Two")){
      e.preventDefault();
      switch(e.which) {
          //up
          case 65: // character a
          case 81: // character q
          case 70: // character f
          case 37: // left
          case 38: // up
            if(readPosition != "0"){
              readPosition--;
            }
            socket.emit('controlls', { room: room, msg: "position",msgextra: readPosition});
          break;
          //down
          case 69: // character e
          case 68: // character d
          case 74: // character j
          case 39: // right
          case 40: // down
            if(readPosition != ($(".messagesRead div").length - 1)){
              readPosition++;
            }
            socket.emit('controlls', { room: room, msg: "position",msgextra: readPosition});
          break;

          case 32: // spacebar
          //hier
          readerScrollTop = $(window).scrollTop();
          socket.emit('controlls', { room: room, msg: "positionscrollauto",msgextra: readerScrollTop});


          default: return; // exit this handler for other keys
      }
    }
  });

var socket = io.connect();
    var socket = io();
    var room = $('#room').val();

    socket.on('connect', function() {
      // Connected, let's sign-up for to receive messages for this room
      socket.emit('room', room);
    });

    $('#inputForm').submit(function() {
      socket.emit('chat message', { room: room, msg: $('#m').val()});
      $('#m').val('');
      return false;
    });
    socket.on('chat message', function(msg) {
      console.log(msg);
      $('.messagesWrite').append('<div><p contenteditable="false">'+ msg +'</p></div>');//contenteditable will be soon true, so you can edit later.
      $('.messagesRead').append('<div><p>'+ msg +'</p></div>');
      $('#m').focus();
    });
    socket.on('controlls', function(msg, msgextra) {
      if(msg == "alert")
      {
        $('.alert-text').text('There is a problem reported');
        $('.alert').show();
      }else if(msg =="position"){
        $("body").animate({ scrollTop: ($('.messagesRead').height() / $(".messagesRead div").length) * msgextra }, 'fast');
      }else if(msg =="positionscrollauto"){
        //hier ook
        var readerScrollTop = msgextra;
        if (readerTimerScroll == true){
          readerTimerScroll = false;
          readerScrollAutoDown =
            setInterval(function () {
              readerScrollTop += scrollSpeed;
              if($(window).scrollTop() + $(window).height() > $(document).height() - 500){
                clearInterval(readerScrollAutoDown);
                $('.alert-text').text('End of cue');
                $('.alert').show();
              }
              $("body").animate({ scrollTop: readerScrollTop }, 700, 'linear');
            }, 300);
        } else if(readerTimerScroll == false){
          readerTimerScroll = true;
          clearInterval(readerScrollAutoDown);
        }
      }else {
        console.log(msgextra + ": Unknown error in width controlls, report to developer")
      }
    });
    $('#createRoom, #arrow-right').click(function(e){
      e.preventDefault();
      var roomId = $('#room').val();
      socket.emit('room',roomId);
      $('.alert-text').text('Room has been created');
      $('.alert').show();
    });
});

// Find the right method, call on correct element
function launchFullscreen(element) {
  if ((document.fullScreenElement && document.fullScreenElement !== null) ||
  (!document.mozFullScreen && !document.webkitIsFullScreen)) {
    $('.fullscreen').addClass('compress').removeClass('expand');
    if(element.requestFullscreen) {
      element.requestFullscreen();
    } else if(element.mozRequestFullScreen) {
      element.mozRequestFullScreen();
    } else if(element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen();
    } else if(element.msRequestFullscreen) {
      element.msRequestFullscreen();
    }
  }else{
    $('.fullscreen').addClass('expand').removeClass('compress');
    if (document.cancelFullScreen) {
      document.cancelFullScreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitCancelFullScreen) {
      document.webkitCancelFullScreen();
    } else if(element.msCancelFullscreen) {
      element.msCancelFullscreen();
    }
  }
}
