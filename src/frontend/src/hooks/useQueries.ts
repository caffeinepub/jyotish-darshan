import { useMutation, useQuery } from "@tanstack/react-query";
import type {
  Astrologer,
  Horoscope,
  Numerology,
  Rashi,
  VastuTip,
} from "../backend.d";
import { useActor } from "./useActor";

export function useGetAllRashis() {
  const { actor, isFetching } = useActor();
  return useQuery<Rashi[]>({
    queryKey: ["rashis"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllRashis();
    },
    enabled: !!actor && !isFetching,
    staleTime: 5 * 60 * 1000,
  });
}

export function useGetHoroscope(rashi: string) {
  const { actor, isFetching } = useActor();
  return useQuery<Horoscope>({
    queryKey: ["horoscope", rashi],
    queryFn: async () => {
      if (!actor || !rashi) throw new Error("No actor or rashi");
      return actor.getHoroscope(rashi);
    },
    enabled: !!actor && !isFetching && !!rashi,
    staleTime: 10 * 60 * 1000,
  });
}

export function useGetAllNumerology() {
  const { actor, isFetching } = useActor();
  return useQuery<Numerology[]>({
    queryKey: ["numerology"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllNumerology();
    },
    enabled: !!actor && !isFetching,
    staleTime: 5 * 60 * 1000,
  });
}

export function useGetNumerology(number: bigint | null) {
  const { actor, isFetching } = useActor();
  return useQuery<Numerology>({
    queryKey: ["numerology", number?.toString()],
    queryFn: async () => {
      if (!actor || number === null) throw new Error("No actor or number");
      return actor.getNumerology(number);
    },
    enabled: !!actor && !isFetching && number !== null,
    staleTime: 5 * 60 * 1000,
  });
}

export function useGetAllVastuTips() {
  const { actor, isFetching } = useActor();
  return useQuery<VastuTip[]>({
    queryKey: ["vastu"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllVastuTips();
    },
    enabled: !!actor && !isFetching,
    staleTime: 5 * 60 * 1000,
  });
}

export function useGetVastuByCategory(category: string) {
  const { actor, isFetching } = useActor();
  return useQuery<VastuTip[]>({
    queryKey: ["vastu", category],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getVastuByCategory(category);
    },
    enabled: !!actor && !isFetching && !!category,
    staleTime: 5 * 60 * 1000,
  });
}

export function useGetAllAstrologers() {
  const { actor, isFetching } = useActor();
  return useQuery<Astrologer[]>({
    queryKey: ["astrologers"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllAstrologers();
    },
    enabled: !!actor && !isFetching,
    staleTime: 5 * 60 * 1000,
  });
}

export function useSubmitKundali() {
  const { actor } = useActor();
  return useMutation<
    bigint,
    Error,
    {
      name: string;
      dateOfBirth: string;
      timeOfBirth: string;
      placeOfBirth: string;
      email: string;
    }
  >({
    mutationFn: async ({
      name,
      dateOfBirth,
      timeOfBirth,
      placeOfBirth,
      email,
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.submitKundaliRequest(
        name,
        dateOfBirth,
        timeOfBirth,
        placeOfBirth,
        email,
      );
    },
  });
}
