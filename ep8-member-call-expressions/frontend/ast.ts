// deno-lint-ignore-file no-empty-interface
// https://github.com/tylerlaceby/guide-to-interpreters-series
// -----------------------------------------------------------
// --------------          AST TYPES        ------------------
// ---     Defines the structure of our languages AST      ---
// -----------------------------------------------------------

export type NodeType =
  | "Program"
  | "MemberExpr"
  | "CallExpr"
  | "NumericLiteral"
  | "Identifier"
  | "BinaryExpr";

/**
 * Statements do not result in a value at runtime.
 They contain one or more expressions internally */
export interface Stmt {
  kind: NodeType;
}

/**
 * Defines a block which contains many statements.
 * -  Only one program will be contained in a file.
 */
export interface Program extends Stmt {
  kind: "Program";
  body: Stmt[];
}

/**  Expressions will result in a value at runtime unlike Statements */
export interface Expr extends Stmt {}

/**
 * A operation with two sides seperated by a operator.
 * Both sides can be ANY Complex Expression.
 * - Supported Operators -> + | - | / | * | %
 */
export interface BinaryExpr extends Expr {
  kind: "BinaryExpr";
  left: Expr;
  right: Expr;
  operator: string; // needs to be of type BinaryOperator
}

/**
 * Member expressions are expressions which contains the . operator or [indx] operator.
 */
export interface MemberExpr extends Expr {
  kind: "MemberExpr";
  object: Expr;
  property: Expr;
  computed: boolean;
}

/**
 * Call Expression has the caller and the arguments as a array of expressions
 */
export interface CallExpr extends Expr {
  kind: "CallExpr";
  caller: Expr;
  arguments: Expr[];
}

// LITERAL / PRIMARY EXPRESSION TYPES
/**
 * Represents a user-defined variable or symbol in source.
 */
export interface Identifier extends Expr {
  kind: "Identifier";
  symbol: string;
}

/**
 * Represents a numeric constant inside the soure code.
 */
export interface NumericLiteral extends Expr {
  kind: "NumericLiteral";
  value: number;
}
