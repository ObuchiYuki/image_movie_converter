import styled from "styled-components"

const _ProminentButton = styled.button<{ disabled?: boolean }>`
  background: linear-gradient(90deg, #0C04FE 0%, #C34CEE 100%);
  padding: 12px 24px;
  border-radius: 999px;
  color: white;
  font-weight: bold;
  height: 48px;
  font-size: 16px;
  min-width: 300px;
  opacity: ${({ disabled }) => disabled ? 0.25 : 1};
  cursor: ${({ disabled }) => disabled ? "" : "pointer"};
  transition: opacity 0.3s;
`

export const ProminentButton = ({ children, disabled, type = "button", ...props }: { children: React.ReactNode, disabled?: boolean, type?: "button" | "submit" | "reset" } & React.HTMLProps<HTMLButtonElement>) => {
  return (
    <_ProminentButton disabled={disabled} type={type} {...props}>
      {children}
    </_ProminentButton>
  )
}