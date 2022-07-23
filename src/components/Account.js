function registerUser(e) {
  e.preventDefault();
  let xhr = new XMLHttpRequest();
  let registerForm = document.getElementById('RegisterForm').elements;

  let user_name = registerForm[0].value;
  let first_name = registerForm[1].value;
  let last_name = registerForm[2].value;
  let phone = registerForm[3].value;
  let email = registerForm[4].value;
  let password = registerForm[5].value;

  let data = {
    user_name: user_name,
    first_name: first_name,
    last_name: last_name,
    phone_number: phone,
    email: email,
    password: password,
    is_admin: 0,
  };
  xhr.onload = function () {
    if (this.readyState === 4 && this.status === 200) {
      const user = JSON.parse(this.response);
      localStorage.setItem('user_name', user_name);
      localStorage.setItem('password', password);
      localStorage.setItem('admin', user.is_admin);
      localStorage.setItem('fname', user.first_name);
      localStorage.setItem('lname', user.last_name);
      window.location.href = '/';
    } else if (this.status === 404) {
      alert(this.responseText);
    }
  };
  xhr.open('POST', 'http://localhost:8080/used_products_store/users/register');
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send(JSON.stringify(data));
}

//////////////////////////////////////
const loginUser = (e) => {
  e.preventDefault();
  let xhr = new XMLHttpRequest();
  let loginForm = document.getElementById('LoginForm').elements;
  let user_name = loginForm[0].value;
  let password = loginForm[1].value;

  let data = {
    user_name: user_name,
    password: password,
  };

  xhr.onload = function () {
    if (this.readyState === 4 && this.status === 200) {
      const user = JSON.parse(this.response);
      localStorage.setItem('user_name', user_name);
      localStorage.setItem('password', password);
      localStorage.setItem('admin', user.is_admin);
      localStorage.setItem('fname', user.first_name);
      localStorage.setItem('lname', user.last_name);
      window.location.href = '/';
    } else if (this.status === 404) {
      alert(this.responseText);
    }
  };
  xhr.open('POST', 'http://localhost:8080/used_products_store/users/login');
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send(JSON.stringify(data));
};

const Account = () => {
  const LoginForm = document.getElementById('LoginForm');
  const RegForm = document.getElementById('RegisterForm');
  const Indicator = document.getElementById('Indicator');

  function register() {
    RegForm.style.transform = 'translateX(0px)';
    LoginForm.style.transform = 'translateX(0px)';
    Indicator.style.transform = 'translateX(100px)';
  }
  function login() {
    RegForm.style.transform = 'translateX(300px)';
    LoginForm.style.transform = 'translateX(300px)';
    Indicator.style.transform = 'translateX(0px)';
  }

  return (
    <div className="account-page">
      <div className="container">
        <div className="row">
          <div className="col-2">
            <div className="form-container">
              <div className="form-btn">
                <span onClick={login}>Login</span>
                <span onClick={register}>Signup</span>
                <hr id="Indicator" />
              </div>
              <form id="LoginForm" onSubmit={loginUser}>
                <input type="text" placeholder="Username" required />
                <input type="password" placeholder="Password" required />
                <input type="submit" className="btn" value="Login" />
                <a href="">Forgot password?</a>
              </form>
              <form id="RegisterForm" onSubmit={registerUser}>
                <input type="text" placeholder="Username" required />
                <input type="text" placeholder="First Name" required />
                <input type="text" placeholder="Last Name" required />
                <input type="text" placeholder="Phone Number" required />
                <input type="email" placeholder="Email" required />
                <input type="password" placeholder="Password" required />
                <input type="submit" className="btn" value="Signup" />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
