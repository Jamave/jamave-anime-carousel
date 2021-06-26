/*Jamave carousel info.
  Created by: Jamave Themes
  Developer name: Abhishsek Sawan
*/
class jamave_anime_carousel {
  constructor(obj) {
    this.prime_obj = obj.ele_id || '';
    this.side_rods = obj.side_rods || false;
    this.lr_color = obj.left_rod_color || '#FFE500';
    this.rr_color = obj.right_rod_color || '#4847ad';
    this.img_time = obj.img_transition_time || '5';
    this.grad_top_color = obj.grad_top_color || 'rgb(251,255,0,0.148)';
    this.grad_bottom_color = obj.grad_bottom_color || 'rgb(72,71,173, 0.9)';
    this.font_color = obj.font_color || '#fff';
    this.font_family = obj.font_family || '';
    this.tl_text_bg = obj.tl_text_bg || '#4847ad';
    this.img_style = obj.img_style || 'cover';
    this.carousel_prime = document.querySelector(`#${this.prime_obj}`);
    this.carousel_image = this.carousel_prime.getElementsByClassName('carousel_image');
    this.carousel_text = this.carousel_prime.getElementsByClassName('carousel_text');
    this.carousel_top_left_text = this.carousel_prime.getElementsByClassName('carousel_top_left_text');
    this.carousel_top_right_img = this.carousel_prime.getElementsByClassName('carousel_top_right_img');
    this.carousel_content = this.carousel_prime.getElementsByClassName('carousel_content');
    Object.assign(this.carousel_prime.style, {
        width:'100%',
        height: '100%',
        overflow:'hidden',
        position:'relative'
    });
    this.carousel_image.forEach((item, index) => {
      Object.assign(this.carousel_image[index].querySelector('img').style, {
        width:'100%',
        height:'100%',
        overflow:'hidden',
        'object-fit': `${this.img_style}`,
        'background-repeat':'no-repeat',
        'background-size':'contain',
        'background-position':'center',
        'z-index':'-5',
        position:'absolute'
      });
    });
    this.carousel_content.forEach((item, index) => {
      this.carousel_content[index].innerHTML+="<div class='carousel_bg_gradient'></div>";
    })
    Object.assign(this.carousel_prime.querySelector('.carousel_bg_gradient').style, {
        width: '100%',
        height: '100%',
        bottom: '0',
        position: 'absolute',
        'background-image': `linear-gradient(${this.grad_top_color} 35%, ${this.grad_bottom_color})`,
        'z-index':'-1'
    });
      this.carousel_text.forEach((item, index) => {
        Object.assign(this.carousel_text[index].style, {
          position: 'absolute',
          color: this.font_color,
          bottom: 25,
          'font-size':'20px',
          'font-family': this.font_family,
          padding: '0 40px'
        });
      });
    
    if(this.side_rods) {
      this.carousel_prime.innerHTML += "<div class='carousel_side_rod carousel_left_rod'></div><div class='carousel_side_rod carousel_right_rod'></div>";
    this.carousel_side_rod = this.carousel_prime.getElementsByClassName('carousel_side_rod');
    this.carousel_side_rod.forEach((item, index) => {
      Object.assign(this.carousel_side_rod[index].style, {
        width: '12px',
        height: '100%',
        position: 'absolute'
      });  
    });
      Object.assign(this.carousel_prime.querySelector('.carousel_left_rod').style, {
        left: 0,
        top: 0,
        'background-color': this.lr_color,
        animation:'carousel_left_rod_animation 15s linear infinite',
        'animation-direction':'alternate'
      });
      Object.assign(this.carousel_prime.querySelector('.carousel_right_rod').style, {
        right: 0,
        bottom: 0,
        'background-color': this.rr_color,
        animation:'carousel_right_rod_animation 15s linear infinite',
        'animation-direction':'alternate'
      });
    }
    this.carousel_top_left_text.forEach((item, index) => {
      Object.assign(this.carousel_top_left_text[index].style, {
        width:'80px',
        height:'15px',
        'background-color': this.tl_text_bg,
        position:'absolute',
        'text-align':'center',
        color: this.font_color,
        'font-family': this.font_family,
        left: '25px',
        padding:'5px 0',
        top:0,
        'font-size':'12px',
        'font-weight':'bold',
      })
    })
    this.carousel_top_right_img.forEach((item, index) => {
      Object.assign(this.carousel_top_right_img[index].style, {
        right:10,
        top:10,
        position:'absolute',
        width:'80px'
      });
    });
    this.carousel_image.forEach((item, index) => {
      if(index==0){
        this.carousel_top_left_text[index].style.animation = 'top_left_animation 1s';
        this.carousel_image[index].querySelector('img').style.animation = `carousel_animation ${this.img_time}s`;
        this.carousel_text[index].style.animation = 'carousel_text_animation 1.5s';
      } else {
        this.carousel_top_left_text[index].style.display = 'none';
      this.carousel_image[index].querySelector('img').style.display = 'none';
      this.carousel_text[index].style.display = 'none';
      }
    });
    if(this.carousel_image.length > 1) {
      let i = 1;
      let initiate = true;
      setInterval(() => {
        if(initiate){
          initiate = false;
        }
        let last_slide = this.carousel_image[this.carousel_image.length-1].querySelector('img');
        if(i>0){
          this.carousel_top_left_text[i-1].style.display = 'none';
          this.carousel_text[i-1].style.display = 'none';
          this.carousel_image[i-1].querySelector('img').style.display = 'none';
        } else if(i==0 && last_slide.style.display != 'none'){
          this.carousel_top_left_text[this.carousel_top_left_text.length-1].style.display = 'none';
          last_slide.style.display = 'none';
          this.carousel_text[this.carousel_text.length-1].style.display = 'none';
        }
        this.carousel_top_left_text[i].style.display = 'block';
        this.carousel_image[i].querySelector('img').style.display = 'block';
        this.carousel_text[i].style.display = 'block';
        
        this.carousel_top_left_text[i].style.animation = 'top_left_animation 1s';
        this.carousel_image[i].querySelector('img').style.animation = `carousel_animation ${this.img_time}s`;
        
        this.carousel_text[i].style.animation = 'carousel_text_animation 1.5s';
        if(i<this.carousel_image.length-1){
          i+=1;
        } else if(!initiate && i==this.carousel_image.length-1){
          i=0;
        }
      }, this.img_time*1000);
    }
    this.carousel_animation = document.createElement('style');
    this.carousel_animation.type = 'text/css';
    this.carousel_animation_rules = document.createTextNode('@-webkit-keyframes carousel_animation {'+
    '0% { -webkit-transform:scale(1); opacity:0}'+
    '10% {opacity:1}'+
    `90% { -webkit-transform:scale(1.5); opacity:1 }`+
    '100% { opacity:0 }'+
    '}');
    this.carousel_animation.appendChild(this.carousel_animation_rules);
    document.getElementsByTagName("head")[0].appendChild(this.carousel_animation);
    this.carousel_text_animation = document.createElement('style');
    this.carousel_text_animation.type = 'text/css';
    this.carousel_text_animation_rules = document.createTextNode('@-webkit-keyframes carousel_text_animation {'+
    'from { -webkit-transform:translate(-500px, 0) }'+
    'to { -webkit-transform:translate(0px, 0) }'+
    '}');
    this.carousel_text_animation.appendChild(this.carousel_text_animation_rules);
    document.getElementsByTagName("head")[0].appendChild(this.carousel_text_animation);
    if(this.side_rods){
      this.carousel_left_rod_animation = document.createElement('style');
      this.carousel_left_rod_animation.type = 'text/css';
      this.carousel_left_rod_animation_rules = document.createTextNode('@-webkit-keyframes carousel_left_rod_animation {'+
      'from { height: 0%}'+
      'to { height: 100% }'+
      '}');
      this.carousel_left_rod_animation.appendChild(this.carousel_left_rod_animation_rules);
      document.getElementsByTagName("head")[0].appendChild(this.carousel_left_rod_animation);
      this.carousel_right_rod_animation = document.createElement('style');
      this.carousel_right_rod_animation.type = 'text/css';
      this.carousel_right_rod_animation_rules = document.createTextNode('@-webkit-keyframes carousel_right_rod_animation {'+
      'from { height: 0%}'+
      'to { height: 100% }'+
      '}');
      this.carousel_right_rod_animation.appendChild(this.carousel_right_rod_animation_rules);
      document.getElementsByTagName("head")[0].appendChild(this.carousel_right_rod_animation);
    }
    this.top_left_animation = document.createElement('style');
    this.top_left_animation.type = 'text/css';
    this.top_left_animation_rules = document.createTextNode('@-webkit-keyframes top_left_animation {'+
    'from { -webkit-transform: translate(0, -50px)}'+
    'to { -webkit-transform: translate(0, 0) }'+
    '}');
    this.top_left_animation.appendChild(this.top_left_animation_rules);
    document.getElementsByTagName("head")[0].appendChild(this.top_left_animation);
      }
}