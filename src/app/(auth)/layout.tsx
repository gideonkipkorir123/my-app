export default function Layout({
    children,
    forgotPassword,
    login,
    register,
    resetPassword
  }: {
    children: React.ReactNode
    login: React.ReactNode
    forgotPassword: React.ReactNode
    resetPassword: React.ReactNode
    register: React.ReactNode
  }) {
    return (
      <>
        {children}
        {forgotPassword}
        {login}
        {resetPassword}
        {register}
      </>
    )
  }