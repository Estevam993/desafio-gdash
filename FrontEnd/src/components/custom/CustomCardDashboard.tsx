import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import type {CustomCardDashboardProps} from "@/types/CustomCardDashboardProps.ts";


/**
 * CustomCardDashboard
 *
 * @component
 *
 * @param {Object} props - Component properties.
 * @param {string} [props.title] - Título exibido no cabeçalho do card (opcional).
 * @param {string | ReactNode} [props.text] - Texto principal do card (pode ser número, string ou JSX).
 * @param {ReactNode} [props.icon] - Ícone exibido no cabeçalho do card (opcional).
 * @param {...props} [props] - Qualquer prop adicional passada para o componente `Card` (ex: onClick, className).
 *
 * @example
 * <CustomCardDashboard
 *   title="Usuários"
 *   text="1.286"
 *   icon={<UserIcon />}
 * />
 */
const CustomCardDashboard = ({title, text, icon, ...props}: CustomCardDashboardProps) => {
  return (
    <div
      style={{
        backgroundImage: `url(${icon})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backdropFilter: "blur(10px)",
        height: "100%",
        borderRadius: "calc(var(--radius) + 4px",
      }}
    >
      <Card
        style={{
          background: icon ? "transparent" : "",
          backdropFilter: "blur(2px)",
          height: "100%",
          border: "none",
        }}
        {...props}
      >
        {
          title && (
            <CardHeader>
              <CardTitle>{title}</CardTitle>
            </CardHeader>
          )
        }
        <CardContent>
          <div className="text-5xl font-bold ">
            {text}
          </div>
        </CardContent>

      </Card>
    </div>
  )
}

export default CustomCardDashboard