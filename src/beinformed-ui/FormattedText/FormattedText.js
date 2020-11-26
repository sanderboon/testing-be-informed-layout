// @flow
import textile from "textilejs";

export type Props = {
  +className?: string,
  +dataName?: string,
  +text: string,
};

/**
 * Render pre formatted *sanitized* text.
 * {@see https://facebook.github.io/react/tips/dangerously-set-inner-html.html}
 */
const FormattedText = ({ className, dataName, text }: Props) =>
  text ? (
    <div
      className={className}
      data-id={dataName}
      dangerouslySetInnerHTML={{
        __html: textile(text),
      }}
    />
  ) : null;

FormattedText.displayName = "BI.FormattedText";

export default FormattedText;
