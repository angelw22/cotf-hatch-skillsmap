import React from 'react';
import Swiper from 'react-id-swiper';
import 'swiper/css/swiper.css';
import './cardSwiper.scss'
// import { url } from 'inspector';

const CHAPTERS = {'UXD Track': 5, 'Design Track': 2, 'Web Design Track': 3}

class CardSwiper extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
			sorted: [],
			vSwiper: '',
			hSwiper: [],
			active: '',
			params : {
				direction: 'horizontal',
				effect: 'coverflow',
				// grabCursor: true,
				centeredSlides: true,
				slidesPerView:5,
				slideToClickedSlide	: true,
				coverflowEffect: {
					rotate: -20,
					stretch: 0,
					depth: 100,
					modifier: 1,
					slideShadows: false
				},
				// pagination: {
				// 	el: '.swiper-pagination',
        // 	clickable: true,
        // 	dynamicBullets: true
				// },
				mousewheel : {
					forceToAxis: true,
					invert: true
				},
			},
			params2: {
				direction: 'vertical',
				slidesPerView: 'auto',
				centeredSlides: true,
				slideToClickedSlide: true,
				spaceBetween: 20,
				// pagination: {
				// 	el: '.swiper-pagination',
				// 	clickable: true,
				// },
				mousewheel: {
					forceToAxis: true,
					invert: true
				}
			},
			
		}
	}

	updateVerticalSwiper(s) {
		this.setState({vSwiper: s})

		if (s.slides[s.activeIndex]) {
			console.log(s.activeIndex);
			this.setState({active_row: s.activeIndex})
		}

		s.on('transitionEnd', () => {
			console.log(s.activeIndex);
			this.setState({active_row: s.activeIndex})
			this.updateSwiper()
		})
		
	}

	updateSwiper() {
		let s = this.state.hSwiper[this.state.active_row]

		if (s && s.slides[s.activeIndex]) {
			let x = s.slides[s.activeIndex]
			this.setState({'active': x})
		}
	}

	addSwipers(s) {
		this.state.hSwiper.push(s)
		this.updateSwiper();

		s.on('beforeDestroy', () => {
			this.state.hSwiper.shift();
		})

		s.on('transitionEnd', () => {
			this.setState({'active': s.slides[s.activeIndex]})
		})
	}

	generateCards () {
		let stuff = []
		for (let i = 1; i < CHAPTERS[this.props.active_topic]; i++) {
			let segments = this.props.data.filter(item => item[0] == i.toString());
			stuff.push(segments);
		}

		return (
			<div className="cardsWrapper">
				<Swiper {...this.state.params2} getSwiper={(s) => this.updateVerticalSwiper(s)}>
					{stuff.map((chapter, index) =>
						<div className="HELLLOOO" key={index}>
							<Swiper 
								{...this.state.params} 
								id={index} 
								key={chapter.length} 
								getSwiper={(s) => this.addSwipers(s)}
							>
									{chapter.map((mods, index) => 
										<div className="module-container" 
											key={index} 
											onClick={(e) => 
												e.currentTarget === this.state.active ? 
												this.props.modal_data(true, {
													'title': mods[5],
													'description': mods[7],
													'requirement': mods[9] 
												})
												: ''
											}
										>
											<img src={mods[13]}></img>
										</div>
									)}
							</Swiper>
						</div>
					)}
				</Swiper>
			</div>
		)
	}

	render () {
		let stuff = this.props.headers && this.props.data ? 
		this.generateCards()
		: ''
		return (
			stuff || ''
		)
	}
};


export default CardSwiper;
    