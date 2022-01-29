import { Environment } from '../src/utils/config';

declare global {
  function getMiniflareBindings(): Environment;
  function getMiniflareDurableObjectStorage(
    id: DurableObjectId
  ): Promise<DurableObjectStorage>;
}

export {};
