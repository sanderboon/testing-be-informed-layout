declare interface IConstraintModel {
  +id: string;
  +defaultMessage: string;
  +parameters: Object;
  +isMandatoryConstraint: boolean;
  validate(value: any): boolean;
  hasValidation(): boolean;
}
