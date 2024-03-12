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

<section id="login" class="section">
    <div class="container">
        <div class="row">
            <div class="col-sm-12 text-center">
                <h2>Login</h2>
                <p class="lead">Please login to make appointment.</p>
                            </div>
            <div class="col-sm-offset-3 col-sm-6">
                <form class="form-horizontal" action="https://katalon-demo-cura.herokuapp.com/authenticate.php" method="post">
                    <div class="alert alert-info">
                        <div class="form-group">
                            <label for="demo_account" class="col-sm-4 control-label">Demo account</label>
                            <div class="col-sm-8">
                                <div class="input-group">
                                  <span class="input-group-addon" id="demo_username_label"><span class="glyphicon glyphicon-user" aria-hidden="true"></span></span>
                                  <input type="text" class="form-control" placeholder="Username" aria-describedby="demo_username_label" value="John Doe" readonly="">
                                </div>
                            </div>
                        </div>
                        <div class="form-group" style="margin-bottom: 0;">
                            <div class="col-sm-offset-4 col-sm-8">
                                <div class="input-group">
                                  <span class="input-group-addon" id="demo_password_label"><span class="glyphicon glyphicon-lock" aria-hidden="true"></span></span>
                                  <input type="text" class="form-control" placeholder="Password" aria-describedby="demo_password_label" value="ThisIsNotAPassword" readonly="">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="txt-username" class="col-sm-4 control-label">Username</label>
                        <div class="col-sm-8">
                            <input type="text" class="form-control" id="txt-username" name="username" placeholder="Username" value="" autocomplete="off">
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="txt-password" class="col-sm-4 control-label">Password</label>
                        <div class="col-sm-8">
                            <input type="password" class="form-control" id="txt-password" name="password" placeholder="Password" value="" autocomplete="off">
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="col-sm-offset-4 col-sm-8">
                            <button id="btn-login" type="submit" class="btn btn-default">Login</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</section>

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
    <a id="to-top" href="#top" class="btn btn-dark btn-lg" style="display: block; position: fixed;"><i class="fa fa-chevron-up fa-fw fa-1x"></i></a>
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
        "fill the login form and submit with the given credentials",
        [
          {
            action: {
              type: "navigate",
              parameters: {
                value: "https://katalon-demo-cura.herokuapp.com/",
              },
            },
          },
          {
            action: {
              type: "click",
              parameters: {
                target: {
                  locators: [
                    {
                      type: "css",
                      value: "#btn-make-appointment",
                    },
                  ],
                },
              },
            },
          },
        ],
        html
      ),
    ],
  });
})();
