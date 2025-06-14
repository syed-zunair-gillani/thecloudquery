import { parsePageForTemplates } from "./parsePageForCategoryModule";
import { TEMPLATE_CONFIG } from "./templateConfig";

export function parseAllTemplates(page) {
  const modules = [];

  for (const [templateBlockClass, cardTypes] of Object.entries(TEMPLATE_CONFIG)) {
    const parsedBlocks = parsePageForTemplates(page, templateBlockClass, cardTypes);

    if (Array.isArray(parsedBlocks)) {
      parsedBlocks.forEach(block => {
        block.templateBlockClass = templateBlockClass;
        modules.push(block);
      });
    } else if (parsedBlocks) {
      parsedBlocks.templateBlockClass = templateBlockClass;
      modules.push(parsedBlocks);
    }
  }

  return modules;
}
