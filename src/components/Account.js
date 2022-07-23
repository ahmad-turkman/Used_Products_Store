const loginUser = (e) => {
  e.preventDefault();
  let xhr = new XMLHttpRequest();
  let loginForm = document.getElementById('LoginForm').elements;
  let user_name = loginForm[0].value;
  let password = loginForm[1].value;

  // if (user_name === '' || password === '') {
  //   alert('Please fill all required fields');
  //   return;
  // }

  let data = {
    user_name: user_name,
    password: password,
  };

  xhr.onload = function () {
    if (this.readyState === 4 && this.status === 200) {
      alert(this.responseText);
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
              <form id="RegisterForm">
                <input type="text" placeholder="Username" required />
                <input type="text" placeholder="First Name" required />
                <input type="text" placeholder="Last Name" required />
                <input type="text" placeholder="Phone Number" required />
                <input type="email" placeholder="Email" required />
                <input type="password" placeholder="Password" required />
                <button
                  type="submit"
                  className="btn"
                  onClick={console.log('register')}
                >
                  Signup
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
