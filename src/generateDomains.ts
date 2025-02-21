import { checkDomainAvailability } from "./checkDomainAvailability";
import { domainPrefixes, domainSuffixes } from "./prefixesAndSuffixes";

export interface GenerateDomainsParams {
  root: string;
  numDomains: number;
  // Optional: Custom prefixes and suffixes
  prefixes?: string[];
  suffixes?: string[];
}
export async function generateDomains(
  params: GenerateDomainsParams,
): Promise<string[]> {
  const prefixes = params.prefixes ?? domainPrefixes;
  const suffixes = params.suffixes ?? domainSuffixes;

  if (params.numDomains <= 0) {
    return [];
  }

  const totalDomainCombinations =
    prefixes.length + suffixes.length + prefixes.length * suffixes.length;

  if (params.numDomains > totalDomainCombinations) {
    throw new Error(
      `Cannot generate more than ${
        totalDomainCombinations
      } domains -- not enough prefixes and suffixes`,
    );
  }

  // Generate all possible domains
  const allDomains = [
    ...prefixes.map(prefix => `${prefix}${params.root}.com`),
    ...suffixes.map(suffix => `${params.root}${suffix}.com`),
    ...prefixes.flatMap(prefix =>
      suffixes.map(suffix => `${prefix}${params.root}${suffix}.com`),
    ),
  ];

  const domains = [];
  let i = 0;
  while (domains.length < params.numDomains) {
    if (i >= allDomains.length) {
      throw new Error("Ran out of domains to generate");
    }

    const domain = allDomains[i];
    if (await checkDomainAvailability(domain)) {
      domains.push(domain);
    }

    i++;
  }

  return domains;
}
