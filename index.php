<!DOCTYPE HTML>
<html>
    <head>
        <title>Princi</title>
		<meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
        <meta name="viewport" content="width=device-width, initial-scale=1.0"><!-- Remove if you're not building a responsive site. (But then why would you do such a thing?) -->
        <!-- <link rel="shortcut icon" href="/_ui/img/favicon.ico"/> -->

        <link rel="stylesheet" href="/dist/css/main.css" type="text/css" media="all">

        <!-- <link rel="stylesheet" href="/dist/css/main.min.css" type="text/css" media="all"> -->
        <!-- <script src="/dist/js/header-scripts.min.js"></script> -->
    </head>

    <body>
        <header>
			<nav class="offscreen" aria-label="Screen Reader Skip Links">
				<li><a href="#primary">Primary Nav</a></li>
				<!--  -->
				<li><a href="#MAIN CONTENT"></a></li>
			</nav>

			<div class="top-bar">
				<a href="/"><img src="" alt="Spirit of Milan"></a>
				<a href="/"><img src="" alt="Princi"></a>
				<a href="#" class="trigger">Menu</a>
			</div>

			<div id="primary" class="menu">
				<nav role="navigation" aria-label="Primary Navigation">
					<ul>
						<li><a href="/heritage">Heritage</a></li>
						<li><a href="/food">Food</a></li>
						<li><a href="/locations">Locations</a></li>
					</ul>
				</nav>

				<nav role="navigation" aria-label="Social Channels">
					<ul>
						<li><a href="#" target="_blank">Facebook</a></li>
						<li><a href="#" target="_blank">Instagram</a></li>
					</ul>
				</nav>

				<nav role="navigation" aria-label="Language Selection">
					<ul>
						<li><a href="#" target="_blank">English</a></li>
						<li><a href="#" target="_blank">Italian</a></li>
					</ul>
				</nav>
			</div>
		</header>









<div class="parallax">
    <div id="group1" class="parallax__group">
      <div class="parallax__layer parallax__layer--base">
        <div class="title">Base Layer</div>
      </div>
    </div>
    <div id="group2" class="parallax__group">
      <div class="parallax__layer parallax__layer--base">
        <div class="title">Base Layer</div>
      </div>
      <div class="parallax__layer parallax__layer--back">
        <div class="title">Background Layer</div>
      </div>
    </div>
    <div id="group3" class="parallax__group">
      <div class="parallax__layer parallax__layer--fore">
        <div class="title">Foreground Layer</div>
      </div>
      <div class="parallax__layer parallax__layer--base">
        <div class="title">Base Layer</div>
      </div>
    </div>
    <div id="group4" class="parallax__group">
      <div class="parallax__layer parallax__layer--base">
        <div class="title">Base Layer</div>
      </div>
      <div class="parallax__layer parallax__layer--back">
        <div class="title">Background Layer</div>
      </div>
      <div class="parallax__layer parallax__layer--deep">
        <div class="title">Deep Background Layer</div>
      </div>
    </div>
    <div id="group5" class="parallax__group">
      <div class="parallax__layer parallax__layer--fore">
        <div class="title">Foreground Layer</div>
      </div>
      <div class="parallax__layer parallax__layer--base">
        <div class="title">Base Layer</div>
      </div>
    </div>
    <div id="group6" class="parallax__group">
      <div class="parallax__layer parallax__layer--back">
        <div class="title">Background Layer</div>
      </div>
      <div class="parallax__layer parallax__layer--base">
        <div class="title">Base Layer</div>
      </div>
    </div>
    <div id="group7" class="parallax__group">
      <div class="parallax__layer parallax__layer--base">
        <div class="title">Base Layer</div>
      </div>
    </div>
  </div>


	<!-- DEBUG INFO -->
	<div class="debug">
		<label><input type="checkbox"> Debug</label>
	</div>

	<script>
		var debugInput = document.querySelector("input");
		function updateDebugState() {
	    	document.body.classList.toggle('debug-on', debugInput.checked);
		}
		debugInput.addEventListener("click", updateDebugState);
		updateDebugState();
	</script>
	<!-- END DEBUG -->

	<footer>
		&copy;2017 Princi. All rights reserved.
	</footer>

    <script src="/dist/js/footer-scripts.js"></script>
    <!-- <script src="/dist/js/footer-scripts.min.js"></script> -->
    </body>
</html>
