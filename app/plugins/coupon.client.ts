export default defineNuxtPlugin(() => {
  const route = useRoute()
  const coupon = route.query.cupon as string

  if (coupon) {
    localStorage.setItem('juridica_coupon', coupon)
    // Also set cookie for server-side access
    const cookie = useCookie('juridica_coupon', { maxAge: 60 * 60 * 24 * 30 }) // 30 days
    cookie.value = coupon
  }
})
