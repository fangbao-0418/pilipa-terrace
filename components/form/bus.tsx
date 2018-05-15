import events from '../decorations/events'
@events()
export class Bus {
  public on: <T>(event: string, cb: (payload?: T) => void) => this
  public trigger: <T>(event: string, payload?: T) => this
  public off: (event?: string) => this
}
const bus = new Bus()
export default bus
