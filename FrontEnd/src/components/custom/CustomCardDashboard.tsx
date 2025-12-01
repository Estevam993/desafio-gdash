import {Card, CardAction, CardContent, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import type {CustomCardDashboardProps} from "@/types/CustomCardDashboardProps.ts";


/**
 * CustomCardDashboard
 *
 * @component
 *
 * @param {Object} props - Component properties.
 * @param {string} [props.title] - Título exibido no cabeçalho do card (opcional).
 * @param {string | ReactNode} [props.text] - Texto principal do card (pode ser número, string ou JSX).
 * @param {string} [props.color] - Cor do background e borda do card (ex: "#2563eb" ou "var(--color-primary)").
 * @param {ReactNode} [props.icon] - Ícone exibido no cabeçalho do card (opcional).
 * @param {...CardProps} [props] - Qualquer prop adicional passada para o componente `Card` (ex: onClick, className).
 *
 * @example
 * <CustomCardDashboard
 *   title="Usuários"
 *   text="1.286"
 *   color="var(--color-primary)"
 *   icon={<UserIcon />}
 * />
*/
const CustomCardDashboard = ({title, text, color, icon, ...props}: CustomCardDashboardProps) => {
  return (
    <Card
      style={{
        backgroundColor: color,
        borderColor: color,
      }}
      {...props}
    >
      {
        title && (
          <CardHeader>
            <CardTitle>{title}</CardTitle>
            <CardAction>
              {icon}
            </CardAction>
          </CardHeader>
        )
      }
      <CardContent>
        <div className="text-5xl font-bold">
          {text}
        </div>
      </CardContent>
    </Card>
  )
}

export default CustomCardDashboard