import { injectable } from "tsyringe";
import type { ICloner } from "@spt-aki/utils/cloners/ICloner";

@injectable()
export class StructuredCloner implements ICloner
{
    public clone<T>(obj: T): T
    {
        return structuredClone(obj);
    }
}