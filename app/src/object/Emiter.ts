import { Observable } from 'rxjs';

type ObserverFunction = (data: any) => void;
/**
 * 可订阅发布对象
 */
export default class Emiter<Topic extends number | string> {
  private observers: Map<Topic, ObserverFunction[]>;
  constructor() {
    this.observers = new Map();
  }
  /**
   * 添加被观察者
   */
  private addObserver(topic: Topic, fn: ObserverFunction) {
    if (!this.observers.has(topic)) {
      this.observers.set(topic, []);
    }
    this.observers.get(topic)?.push(fn);
  }
  // 返回一个被观察者
  public on(topic: Topic | Topic[]): Observable<any> {
    return new Observable<any>((observer) => {
      if (Array.isArray(topic)) {
        topic.forEach((t) => {
          this.addObserver(t, (data) => {
            observer.next(data);
          });
        });
      } else {
        this.addObserver(topic, (data) => {
          observer.next(data);
        });
      }
    });
  }
  // 发布信息
  public emit(topic: Topic, data?: any) {
    this.observers.get(topic)?.forEach((fn: ObserverFunction) => fn(data));
  }
}
