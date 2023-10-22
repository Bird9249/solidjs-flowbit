import { Component } from "solid-js";

export interface ISideBarMenu {
  partName: string;
  icon?: Component<{ class?: string }>;
  label: string;
  children?: ISideBarMenu[];
}
