export default function({ store, error }) {
  if (!store.state.isConnected) {
    error({
      message: 'You are not connected',
      statusCode: 403
    })
  }
}
