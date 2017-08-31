<!DOCTYPE HTML>
    <head>
        <title>Princi</title>
		<meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
        <meta name="viewport" content="width=device-width, initial-scale=1.0"><!-- Remove if you're not building a responsive site. (But then why would you do such a thing?) -->

		<style media="screen">
			/* ---- reset ---- */

			body {
			  margin: 0;
			  font:normal 75% Arial, Helvetica, sans-serif;
			  background-color: #000;
			  background-image: url("/_ui/img/fpo/468074438.jpg");
			  background-repeat: no-repeat;
			  background-size: 500px;
			  background-position: 120% 60%;
			}

			canvas {
			  display: block;
			  vertical-align: bottom;
			}

			/* ---- particles.js container ---- */

			#particles-js {
			  position: absolute;
			  width: 100%;
			  height: 100%;
			  z-index: 2;
			}

			/* ---- stats.js ---- */

			.count-particles{
			  background: #000022;
			  position: absolute;
			  top: 48px;
			  left: 0;
			  width: 80px;
			  color: #13E8E9;
			  font-size: .8em;
			  text-align: left;
			  text-indent: 4px;
			  line-height: 14px;
			  padding-bottom: 2px;
			  font-family: Helvetica, Arial, sans-serif;
			  font-weight: bold;
			}

			.js-count-particles{
			  font-size: 1.1em;
			}

			#stats,
			.count-particles{
			  -webkit-user-select: none;
			}

			#stats{
			  border-radius: 3px 3px 0 0;
			  overflow: hidden;
			}

			.count-particles{
			  border-radius: 0 0 3px 3px;
			}
		</style>
	</head>
	<body>
		<!-- particles.js container -->
		<div id="particles-js"></div>

		<!-- stats - count particles -->
		<div class="count-particles">
			<span class="js-count-particles">--</span> particles
		</div>

		<!-- particles.js lib (JavaScript CodePen settings): https://github.com/VincentGarreau/particles.js -->
		<script src='https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js'></script>
		<script src='https://threejs.org/examples/js/libs/stats.min.js'></script>

		<script type="text/javascript">
			/* ---- particles.js config ---- */

			particlesJS("particles-js", {
			  "particles": {
			    "number": {
			      "value": 2000,
			      "density": {
			        "enable": false,
			        "value_area": 800
			      }
			    },
			    "color": {
			      "value": "#ffffff"
			    },
			    "shape": {
			      "type": "circle",
			      "stroke": {
			        "width": 0,
			        "color": "#000000"
			      },
			      "polygon": {
			        "nb_sides": 5
			      },
			      "image": {
			        "src": "img/github.svg",
			        "width": 100,
			        "height": 100
			      }
			    },
			    "opacity": {
			      "value": 0.7,
			      "random": false,
			      "anim": {
			        "enable": false,
			        "speed": 1,
			        "opacity_min": 0.1,
			        "sync": false
			      }
			    },
			    "size": {
			      "value": 1,
			      "random": true,
			      "anim": {
			        "enable": false,
			        "speed": 40,
			        "size_min": 0.1,
			        "sync": false
			      }
			    },
			    "line_linked": {
			      "enable": false,
			      "distance": 150,
			      "color": "#ffffff",
			      "opacity": 0.4,
			      "width": 1
			    },
			    "move": {
			      "enable": true,
			      "speed": 4  ,
			      "direction": "none",
			      "random": true,
			      "straight": false,
			      "out_mode": "out",
			      "bounce": false,
			      "attract": {
			        "enable": false,
			        "rotateX": 600,
			        "rotateY": 1200
			      }
			    }
			  },
			  "interactivity": {
			    "detect_on": "canvas",
			    "events": {
			      "onhover": {
			        "enable": false,
			        "mode": "grab"
			      },
			      "onclick": {
			        "enable": false,
			        "mode": "push"
			      },
			      "resize": true
			    },
			    "modes": {
			      "grab": {
			        "distance": 140,
			        "line_linked": {
			          "opacity": 1
			        }
			      },
			      "bubble": {
			        "distance": 400,
			        "size": 40,
			        "duration": 2,
			        "opacity": 8,
			        "speed": 3
			      },
			      "repulse": {
			        "distance": 200,
			        "duration": 0.4
			      },
			      "push": {
			        "particles_nb": 4
			      },
			      "remove": {
			        "particles_nb": 2
			      }
			    }
			  },
			  "retina_detect": true
			});


			/* ---- stats.js config ---- */

			var count_particles, stats, update;
			stats = new Stats;
			stats.setMode(0);
			stats.domElement.style.position = 'absolute';
			stats.domElement.style.left = '0px';
			stats.domElement.style.top = '0px';
			document.body.appendChild(stats.domElement);
			count_particles = document.querySelector('.js-count-particles');
			update = function() {
			  stats.begin();
			  stats.end();
			  if (window.pJSDom[0].pJS.particles && window.pJSDom[0].pJS.particles.array) {
			    count_particles.innerText = window.pJSDom[0].pJS.particles.array.length;
			  }
			  requestAnimationFrame(update);
			};
			requestAnimationFrame(update);
		</script>
	</body>
</html>
