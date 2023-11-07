import { IErrorState } from "./error-state.interface";

export interface IState<Data> {
    data: Data | undefined;
    loading: boolean;
    error?: IErrorState;
}