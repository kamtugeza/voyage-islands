export interface VoyageComponent {
  onMount(): Promise<void>;
}

export interface VoyageComponentProps {
  el: HTMLElement;
  children: HTMLElement[];
}

export type VoyageComponentConstructor = new (props: VoyageComponentProps) => VoyageComponent;
