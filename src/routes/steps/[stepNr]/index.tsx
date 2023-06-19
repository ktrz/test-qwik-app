import { component$ } from '@builder.io/qwik'
import { Form, routeAction$, useLocation, useNavigate } from '@builder.io/qwik-city'


export const useMyServerAction = routeAction$(async () => {
  await new Promise((resolve) => setTimeout(resolve, 500))

  return { status: 'ok' }
})

export default component$(() => {
  const loc = useLocation()
  const nav = useNavigate()
  const myServerAction = useMyServerAction()

  const stepNr = loc.params.stepNr

  const nextPageUrl = `../${ +stepNr + 1 }`
  return <div>
    <h1>You are on step: { stepNr }</h1>
    <Form
      action={ myServerAction }
      onSubmitCompleted$={ async () => {
        await Promise.resolve()
        console.log(`navigating to '${ nextPageUrl }'`)
        await nav(nextPageUrl, true)
      } }
    >
      <button disabled={ myServerAction.isRunning }>Next step
        (action) { myServerAction.isRunning ? '(running)' : '' }</button>
    </Form>
  </div>
})
