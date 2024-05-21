export interface InputProductDTO {
  name: string;
  price: number;
}

export interface OutputProductDTO extends InputProductDTO {
  id: string;
}
