export class PageResDto<TData> {
  page: number;

  size: number;

  items: TData[];
}
