export function fillTemplate(template:string, variables:any):string {
  let filled = template;
  const variableNames = Object.keys(variables);
  variableNames.forEach(variableName => {
    const variableValue = variables[variableName];
    filled = filled.replaceAll('{' + variableName + '}', variableValue);
  });
  return filled;
}
