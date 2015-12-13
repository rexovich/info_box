var info_box = {
	bg: 'src/img/comp_plate_graybasic.png',
	width_max:323,
	height_max:337,
	pages:[],
	current_page:0,
	
	// методы
	init: function() {
		this.buid_carcase();
		this.json_slides();
	},
	
	buid_carcase: function() {
		var str=
				'<div class= "slides">'
					+'<div class= "image">'
						+'<img src="none.png">'
					+'</div>'
					+'<div class="header">'
					+'</div>'
					+'<div class="body">'
						+'<div class="description">'
						+'</div>'
						+'<div class="note">'
						+'</div>'
					+'</div>'
					+'<div class="details show">'
						+'show details'
					+'</div>'
				+'</div>'
				+'<div class="actions">'
					+'<div class="left">'
						+'<div class="arrow"></div>'
						+'Prev'
					+'</div>'
					+'<div class="right">'
						+'<div class="arrow"></div>'
						+'Next'
					+'</div>'
					+'<a class="find" target="_blank" href="#">'
						+'<div class="arrow"></div>'
						+'Find A Store'
					+'</a>'
				+'</div>'
					;
				
		$('.info_box_container').append(str);
		$('.info_box_container').css('background-image','url("'+this.bg+'")')
			.css('width',this.width_max).css('height',this.height_max);
	},
	
	start_events: function() {
		this.fill_page(0,0);
		var external_this=this;
		$('.info_box_container .left').click(function(){external_this.fill_page(external_this.current_page-1);});
		$('.info_box_container .right').click(function(){external_this.fill_page(external_this.current_page+1);});
		$('.info_box_container .details').click(function(){
			if($(this).hasClass('show'))
			{
				$('.info_box_container .image').slideUp(300);
				$('.info_box_container .body').animate({height:"67%"},300);
				$(this).removeClass('show').text('hide details');
			}
			else
			{
				$('.info_box_container .image').slideDown(300);
				$('.info_box_container .body').animate({height:"26px"},300);
				$(this).addClass('show').text('show details');
			}
		});
	},
	
	json_slides: function() {
		var external_this=this;
		$.getJSON('src/info_box.json', function(data){
			counter=0;
			$.each(data,function(key,val){
				if(('img' in val) && ('title' in val) && ('description' in val) && ('note' in val) && ('productUrl' in val))
				{
					external_this.pages[counter]=val;
					++counter;
				};
			});
			external_this.start_events();
		});
	},
	
	fill_page: function(num,fade) {	
		if(0>num)
			num=this.pages.length-1;
		if((this.pages.length-1)<num)
			num=0;
		
		$('.info_box_container .find').attr('href',this.pages[num]['productUrl']);
		var external_this=this;	
		$('.info_box_container .slides').fadeOut(fade,function(){
			$('.info_box_container .image img').attr('src','src/img/'+external_this.pages[num]['img']);
			$('.info_box_container .header').text(external_this.pages[num]['title']);
			$('.info_box_container .description').text(external_this.pages[num]['description']);
			$('.info_box_container .note').text(external_this.pages[num]['note']);
			$('.info_box_container .slides').fadeIn(fade);
		});

		this.current_page=num;
	},
};

// вызов
info_box.init();