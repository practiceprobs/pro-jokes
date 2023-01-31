export default function SignUp() {
  return (
    <main>
      <h1>Sign up</h1>

      <form id="signup_form">

        <div>
          <label htmlFor="signup_full_name">Full Name</label>
          <input type="text" id="signup_full_name" required />
        </div>

        <div>
          <label htmlFor="signup_email">Email</label>
          <input type="email" id="signup_email" required />
        </div>

        <div>
          <label htmlFor="signup_password">Password</label>
          <input type="password" id="signup_password" required />
        </div>

        <div>
          <label htmlFor="signup_confirm_password">Confirm password</label>
          <input type="password" id="signup_confirm_password" required />
        </div>

        <button type="submit">Sign up</button>

      </form>

      <button>Sign up with Google</button>

    </main>
  )
}