import Emiter from './Emiter';

type StateTransferFunction = (...args: Array<any>) => void;

export default class StateMachine<
  S extends string | number,
  A extends string | number,
  Topic extends string | number
> extends Emiter<Topic> {
  private state: S;
  // S -> A -> S  StateTransferFunction 理解成一个回调函数
  private transferTable: Map<S, Map<A, [StateTransferFunction, S]>>;
  constructor(initialState: S) {
    super();
    this.state = initialState;
    this.transferTable = new Map();
  }

  private addStateTransfer(from: S, to: S, action: A, fn: StateTransferFunction) {
    if (!this.transferTable.has(from)) {
      this.transferTable.set(from, new Map());
    }

    const subMap  = this.transferTable.get(from);
    subMap ?.set(action, [fn, to]);
  }
  // 注册，原状态 到 现在状态 触发那个 action， 回调函数
  public register(from: S | S[], to: S, action: A, fn: StateTransferFunction) {
    if (Array.isArray(from)) {
      from.forEach((s) => {
        this.addStateTransfer(s, to, action, fn);
      });
    } else {
      this.addStateTransfer(from, to, action, fn);
    }
  }

  public dispatch(action: A, ...data: Array<any>) {
    const transferTableMap = this.transferTable.get(this.state);
    if (!transferTableMap) {
      return false;
    }
    if (!transferTableMap.has(action)) {
      return false;
    }
    const [fn, nextS] = transferTableMap.get(action)!;
    fn(...data);
    this.state = nextS;

    // <auto> 状态机的自执行，方便状态自动回位
    while (this.dispatch('<auto>' as A, ...data)) return true;
  }
}
