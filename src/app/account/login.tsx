"use client"

export default function LoginPage() {
  return (
    <div>
      <main>
        <form>
          <h2>Login Form</h2>

          <input type="text" name="username" />
          <input type="password" name="password" />

          <button type="submit">Log In</button>
          <a href="">forgot password</a>
        </form>
      </main>
    </div>
  )
}
