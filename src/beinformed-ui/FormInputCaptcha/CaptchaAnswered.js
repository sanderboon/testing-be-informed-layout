// @flow
import { Icon } from "_component-registry/icon";

export type Props = {
  +answer: string,
};

const CaptchaAnswered = ({ answer }: Props) => (
  <div className="captcha-answered">
    <Icon name="check" textAfter />
    <span className="captcha-answer">{answer}</span>
  </div>
);

CaptchaAnswered.displayName = "BI.CaptchaAnswered";

export default CaptchaAnswered;
