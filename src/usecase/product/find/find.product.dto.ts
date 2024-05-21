export interface InputFindProductDTO {
  id: string;
}

export interface OutputFindProductDTO extends InputFindProductDTO {
  name: string;
  price: number;
}
