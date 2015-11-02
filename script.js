(function(width, height, bomb){

    var volume_bomb;

    function initGame(){
        createField();
        for(var i = 0; i < bomb; i++){
            createBombs();
        }
        volume_bomb = $('.b').length;
        $('.info').text(volume_bomb);
    }
    initGame();
    
    $('.new_game').on('click', function(){
        $('.main').html('');
        initGame();
    });
    
	$(document).on('click','.cell', function(e){      
        if($(this).hasClass('default') && $(this).text() !== ''){
            $(this).addClass('on').removeClass('default').css('background-color', '#fff');
            
            checkWin();

            var number = $(this).text();
            switch(number){
                case '1' : $(this).css('color','blue'); break;
                case '2' : $(this).css('color','green'); break;
                case '3' : $(this).css('color','red'); break;
                case '4' : $(this).css('color','orange'); break;
                case '5' : $(this).css('color','purple'); break;
                case '6' : $(this).css('color','brown'); break;
                case '7' : $(this).css('color','pink'); break;
                case '8' : $(this).css('color','black'); break;
            }
        }else if($(this).hasClass('default') && $(this).text() == ''){
            $(this).addClass('on').removeClass('default').css('background-color', '#fff');

            var r = +$(this).attr('id')[2];
            var c = +$(this).attr('id')[4];
            openSurroundingCells(r,c);

            checkWin();

        }else if($(this).hasClass('b') && !$(this).hasClass('flagged')){
            $('.b').addClass('bb').removeClass('b');
            $('.cell').removeClass('default flagged');
            $(this).css('background-color', 'red');
            $('.info').text('game over');  
        }else if($(this).hasClass('flagged')){
            e.preventDefault();
        }       
	});

    $(document).on('contextmenu','.cell , .main', function(e){
        if($(this).hasClass('default')){
            e.preventDefault();
            $(this).toggleClass('flagged false default').css('background-color', '#eee');
            
            volume_bomb--;
            $('.info').text(volume_bomb);
        }else if($(this).hasClass('flagged') && !$(this).hasClass('b')){
            e.preventDefault();
            $(this).toggleClass('flagged false default');

            volume_bomb++;
            $('.info').text(volume_bomb);
        }else if($(this).hasClass('b') && !$(this).hasClass('flagged')){
            e.preventDefault();
            $(this).toggleClass('flagged').css('background-color', '#eee'); 

            volume_bomb--;
            $('.info').text(volume_bomb);
        }else if($(this).hasClass('b') && $(this).hasClass('flagged')){
            $(this).toggleClass('flagged');

            volume_bomb++;
            $('.info').text(volume_bomb);
        }else{
            e.preventDefault();
        }
    });

	function createField(){
		for(var i = 0; i < width; i++){
            for(var j = 0; j < height; j++){
            	$('.main').append('<div class="cell default" id=c_'+i+'_'+j+'></div>');
            }    
		}		
	}
	
    function createBombs(){
        var c = Math.round(Math.random()*9);
        var r = Math.round(Math.random()*9);
        if(!$('#c_'+r+'_'+c).hasClass('b')){
            $('#c_'+r+'_'+c).addClass('b').removeClass('default').text('');
            createNumberAroundBomb(r,c);
        }else{
            createBombs();
        }   
    }

    function checkWin(){
        if($('.default').length == 0 && $('.false').length == 0){
           $('.cell').removeClass('default flagged');
           $('.b').addClass('bb').removeClass('b').css('background-color','green');
           $('.info').text('you win');
        } 
    }
	  
    function createNumberAroundBomb(r,c){
        var a = $('#c_'+(r-1)+'_'+c);
    	a.hasClass('default') && a.text() == '' ? a.text('1') : a.text()=='1' ? a.text('2') : a.text()=='2' ? a.text('3') : a.text()=='3' ? a.text('4'): a.text()=='4' ? a.text('5') : a.text()=='5' ? a.text('6') : a.text()=='6' ? a.text('7') : a.text()=='7' ? a.text('8') : false;
        var b = $('#c_'+(r+1)+'_'+c);
        b.hasClass('default') && b.text() == '' ? b.text('1') : b.text()=='1' ? b.text('2') : b.text()=='2' ? b.text('3') : b.text()=='3' ? b.text('4'): b.text()=='4' ? b.text('5') : b.text()=='5' ? b.text('6') : b.text()=='6' ? b.text('7') : b.text()=='7' ? b.text('8') : false;
        var k = $('#c_'+r+'_'+(c+1));
        k.hasClass('default') && k.text() == '' ? k.text('1') : k.text()=='1' ? k.text('2') : k.text()=='2' ? k.text('3') : k.text()=='3' ? k.text('4'): k.text()=='4' ? k.text('5') : k.text()=='5' ? k.text('6') : k.text()=='6' ? k.text('7') : k.text()=='7' ? k.text('8') : false;
        var d = $('#c_'+r+'_'+(c-1));
        d.hasClass('default') && d.text() == '' ? d.text('1') : d.text()=='1' ? d.text('2') : d.text()=='2' ? d.text('3') : d.text()=='3' ? d.text('4'): d.text()=='4' ? d.text('5') : d.text()=='5' ? d.text('6') : d.text()=='6' ? d.text('7') : d.text()=='7' ? d.text('8') : false;
        var e = $('#c_'+(r-1)+'_'+(c+1));
        e.hasClass('default') && e.text() == '' ? e.text('1') : e.text()=='1' ? e.text('2') : e.text()=='2' ? e.text('3') : e.text()=='3' ? e.text('4'): e.text()=='4' ? e.text('5') : e.text()=='5' ? e.text('6') : e.text()=='6' ? e.text('7') : e.text()=='7' ? e.text('8') : false;
        var f = $('#c_'+(r+1)+'_'+(c-1));
        f.hasClass('default') && f.text() == '' ? f.text('1') : f.text()=='1' ? f.text('2') : f.text()=='2' ? f.text('3') : f.text()=='3' ? f.text('4'): f.text()=='4' ? f.text('5') : f.text()=='5' ? f.text('6') : f.text()=='6' ? f.text('7') : f.text()=='7' ? f.text('8') : false;
        var g = $('#c_'+(r-1)+'_'+(c-1));
        g.hasClass('default') && g.text() == '' ? g.text('1') : g.text()=='1' ? g.text('2') : g.text()=='2' ? g.text('3') : g.text()=='3' ? g.text('4'): g.text()=='4' ? g.text('5') : g.text()=='5' ? g.text('6') : g.text()=='6' ? g.text('7') : g.text()=='7' ? g.text('8') : false;
        var h = $('#c_'+(r+1)+'_'+(c+1));
        h.hasClass('default') && h.text() == '' ? h.text('1') : h.text()=='1' ? h.text('2') : h.text()=='2' ? h.text('3') : h.text()=='3' ? h.text('4'): h.text()=='4' ? h.text('5') : h.text()=='5' ? h.text('6') : h.text()=='6' ? h.text('7') : h.text()=='7' ? h.text('8') : false;     
    }

    function openSurroundingCells(r,c){
        var a = $('#c_'+(r-1)+'_'+c); !a.hasClass('b')? a.trigger('click') : false;
        var b = $('#c_'+(r+1)+'_'+c); !b.hasClass('b')? b.trigger('click') : false;
        var k = $('#c_'+r+'_'+(c+1)); !k.hasClass('b')? k.trigger('click') : false;
        var d = $('#c_'+r+'_'+(c-1)); !d.hasClass('b')? d.trigger('click') : false;
        var e = $('#c_'+(r-1)+'_'+(c+1)); !e.hasClass('b')? e.trigger('click') : false;  
        var f = $('#c_'+(r+1)+'_'+(c-1)); !f.hasClass('b')? f.trigger('click') : false;   
        var g = $('#c_'+(r-1)+'_'+(c-1)); !g.hasClass('b')? g.trigger('click') : false;   
        var h = $('#c_'+(r+1)+'_'+(c+1)); !h.hasClass('b')? h.trigger('click') : false;
    }


})(10,10,15)