import { createChatCompletion } from "./src/openai";
import { generateUserPrompt, systemPrompt } from "./src/prompts";

const html = `
<body>
<!-- Navigation -->
<a id="menu-toggle" href="#" class="btn btn-dark btn-lg toggle"><i class="fa fa-bars"></i></a>
<nav id="sidebar-wrapper">
    <ul class="sidebar-nav">
        <a id="menu-close" href="#" class="btn btn-light btn-lg pull-right toggle"><i class="fa fa-times"></i></a>
        <li class="sidebar-brand">
            <a href="./" onclick="$('#menu-close').click();">CURA Healthcare</a>
        </li>
        <li>
            <a href="./" onclick="$('#menu-close').click();">Home</a>
        </li>
                <li>
            <a href="profile.php#login" onclick="$('#menu-close').click();">Login</a>
        </li>
            </ul>
</nav>

<!-- Header -->
<header id="top" class="header">
    <div class="text-vertical-center">
        <h1>CURA Healthcare Service</h1>
        <h3>We Care About Your Health</h3>
        <br>
        <a id="btn-make-appointment" href="./profile.php#login" class="btn btn-dark btn-lg">Make Appointment</a>
    </div>
</header>


<!-- Footer -->
<footer>
    <div class="container">
        <div class="row">
            <div class="col-lg-10 col-lg-offset-1 text-center">
                <h4><strong>CURA Healthcare Service</strong>
                </h4>
                <p>Atlanta 550 Pharr Road NE Suite 525<br>Atlanta, GA 30305</p>
                <ul class="list-unstyled">
                    <li><i class="fa fa-phone fa-fw"></i> (678) 813-1KMS</li>
                    <li><i class="fa fa-envelope-o fa-fw"></i> <a href="mailto:info@katalon.com">info@katalon.com</a>
                    </li>
                </ul>
                <br>
                <ul class="list-inline">
                    <li>
                        <a href="#"><i class="fa fa-facebook fa-fw fa-3x"></i></a>
                    </li>
                    <li>
                        <a href="#"><i class="fa fa-twitter fa-fw fa-3x"></i></a>
                    </li>
                    <li>
                        <a href="#"><i class="fa fa-dribbble fa-fw fa-3x"></i></a>
                    </li>
                </ul>
                <hr class="small">
                <p class="text-muted">Copyright © CURA Healthcare Service 2024</p>
            </div>
        </div>
    </div>
    <a id="to-top" href="#top" class="btn btn-dark btn-lg"><i class="fa fa-chevron-up fa-fw fa-1x"></i></a>
</footer>

<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.7/js/bootstrap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.6.4/js/bootstrap-datepicker.min.js"></script>
<script src="https://katalon-demo-cura.herokuapp.com//js/theme.js"></script>




</body>
`;

(async () => {
  await createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      systemPrompt,
      generateUserPrompt(
        "create a new appointment",
        [
          {
            action: {
              type: "navigate",
              parameters: {
                value: "https://katalon-demo-cura.herokuapp.com/",
              },
            },
          },
        ],
        html
      ),
    ],
  });
})();
