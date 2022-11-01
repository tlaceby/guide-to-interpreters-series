import { BinaryExpr, Identifier } from "../../frontend/ast.ts";
import Environment from "../environment.ts";
import { evaluate } from "../interpreter.ts";
import { MK_NULL, NumberVal, RuntimeVal } from "../values.ts";

function eval_numeric_binary_expr(
  lhs: NumberVal,
  rhs: NumberVal,
  operator: string,
): NumberVal {
  let result: number;
  if (operator == "+") {
    result = lhs.value + rhs.value;
  } else if (operator == "-") {
    result = lhs.value - rhs.value;
  } else if (operator == "*") {
    result = lhs.value * rhs.value;
  } else if (operator == "/") {
    // TODO: Division by zero checks
    result = lhs.value / rhs.value;
  } else {
    result = lhs.value % rhs.value;
  }

  return { value: result, type: "number" };
}

/**
 * Evaulates expressions following the binary operation type.
 */
export function eval_binary_expr(
  binop: BinaryExpr,
  env: Environment,
): RuntimeVal {
  const lhs = evaluate(binop.left, env);
  const rhs = evaluate(binop.right, env);

  // Only currently support numeric operations
  if (lhs.type == "number" && rhs.type == "number") {
    return eval_numeric_binary_expr(
      lhs as NumberVal,
      rhs as NumberVal,
      binop.operator,
    );
  }

  // One or both are NULL
  return MK_NULL();
}

export function eval_identifier(
  ident: Identifier,
  env: Environment,
): RuntimeVal {
  const val = env.lookupVar(ident.symbol);
  return val;
}
