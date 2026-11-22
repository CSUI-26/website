import rawMembers from "@/data/members.json";
import type { Member } from "@/types/member";
import { type Member as ApiMember, getAllMembers } from "@/util/api";

/**
 * Loads the member list for the members page.
 *
 * The API is the source of truth, but the page must still build when the API is
 * unreachable, slow, or returns an empty list. `src/data/members.json` is kept
 * as a committed fallback for exactly that case, so a deploy never depends on a
 * third party being up.
 *
 * The fallback is a snapshot of the same records: the API returns every field
 * the local file has except the private `email`, and adds `programId`.
 */

/** A member from either source; the fields the page reads are common to both. */
export type MemberRecord = Member | ApiMember;

export type MemberSource = "api" | "fallback";

export interface MembersResult {
	members: MemberRecord[];
	source: MemberSource;
	/** Populated when the API was tried and did not give a usable answer. */
	reason?: string;
}

/** How long the build waits for the API before falling back. */
const API_TIMEOUT_MS = 10_000;

/**
 * Fetches every member from the API, falling back to the committed snapshot.
 *
 * The timeout matters: this runs during `astro build`, and an unresponsive API
 * would otherwise hang the deploy rather than degrade it.
 */
export async function loadMembers(): Promise<MembersResult> {
	const controller = new AbortController();
	const timer = setTimeout(() => controller.abort(), API_TIMEOUT_MS);

	try {
		const members = await getAllMembers({ signal: controller.signal });
		if (members.length === 0) {
			return {
				members: rawMembers as Member[],
				source: "fallback",
				reason: "the API returned no members",
			};
		}
		return { members, source: "api" };
	} catch (error) {
		return {
			members: rawMembers as Member[],
			source: "fallback",
			reason: error instanceof Error ? error.message : String(error),
		};
	} finally {
		clearTimeout(timer);
	}
}
