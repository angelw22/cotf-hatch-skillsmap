import React from 'react';
import Swiper from 'react-id-swiper';
import 'swiper/css/swiper.css';
import './navBar.scss'
// import Left from '../left.svg'
// import Right from '../right.svg'



class NavBar extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			params : {
				slidesPerView: 3,
				spaceBetween: 0,
				centeredSlides: true,
				loop: true,
				  navigation: {
					nextEl: '.swiper-button-next',
        			prevEl: '.swiper-button-prev'
				  }
				// effect: 'coverflow',
				// grabCursor: true,
				// centeredSlides: true,
				// slidesPerView: 'auto',
				// coverflowEffect: {
				// 	rotate: -30,
				// 	stretch: 0,
				// 	depth: 300,
				// 	modifier: 1,
				// 	slideShadows: false
				// },
				// pagination: {
				// 	el: '.swiper-pagination',
				// 	clickable: true
				// },
				// navigation: {
				// 	nextEl: '.swiper-button-next',
				// 	prevEl: '.swiper-button-prev'
				// }
			},
			swiper: '',
			active: ''
		}

		this.updateSwiper = this.updateSwiper.bind(this);
	}

	updateSwiper(s) {
		this.setState({swiper: s});

		s.on('transitionEnd', () => {
			console.log(s.slides[s.activeIndex].id)
			this.setState({active: s.slides[s.activeIndex].id})
			this.changeTopic(this.state.active)
		})
	}

	changeTopic() {
		this.props.updateTopic(this.state.active)
	}
	

	render() {
		return (
			<div className="navContainer" >
				<div>
				<Swiper {...this.state.params} getSwiper={(s) => {this.updateSwiper(s)}}>
					{this.props.titles.map((item, index) => 
					<div className="navItems" key={index} id={item}>
						<span>{item.replace(" Track", "")}</span>
					</div>)}
				</Swiper>
				</div>
			</div>
		)
	}

}

export default NavBar