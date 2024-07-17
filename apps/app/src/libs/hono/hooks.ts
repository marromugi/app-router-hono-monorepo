import { ClientRequest, ClientRequestOptions, ClientResponse, hc, type InferRequestType, type InferResponseType } from 'hono/client'
import { StatusCode } from "hono/utils/http-status";
import useSWR, { SWRConfiguration } from 'swr'
import useSWRMutation, { SWRMutationConfiguration } from 'swr/mutation'

export const useQuery = <T extends ClientRequest<{
    $get: {
        input: any;
        output: any;
        outputFormat: string
        status: StatusCode;
    };
}>>(client: T, args: InferRequestType<T['$get']>, options: ClientRequestOptions<unknown> = {}, config: SWRConfiguration<InferResponseType<T['$get'], 200> | null, any> = {}) => {
    const key = `${client.$url()}-${JSON.stringify(args)}`;
    return useSWR(key, async (_key: string) => {
        const res = await client.$get(args, options) as Awaited<ReturnType<T['$get']>>
        const json = await res.json();
        return (res.status === 200 ? json : null) as InferResponseType<T['$get'], 200> | null
    }, config)
}

type ExtractMutationMethod<T> = Exclude<T, '$get' | '$url'>

export const useMutation = <P extends Record<string, any>, M extends ExtractMutationMethod<keyof P>>(client: P
    ,method: M, options: ClientRequestOptions<unknown> = {}, config: SWRMutationConfiguration<Awaited<ReturnType<P[M]>>, any> = {}) => {
    const key = `${client.$url()}-${method.toString()}`;
    return useSWRMutation(key, (_key: string, {arg}: {arg: InferRequestType<P[M]>}) => {
        return client[method](arg, options) as Awaited<ReturnType<P[M]>>
    }, config)
}