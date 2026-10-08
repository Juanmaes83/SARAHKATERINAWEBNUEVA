type Member = { email: string; role: string; display_name: string | null; active: boolean; joined_at: string | null };

/** Enrollment is handled through the Supabase administrator invitation flow. */
export function Team({ members, admin }: { members: Member[]; admin: boolean }) {
  return <>
    <section>
      <h2>Members</h2>
      <ul>{members.map(member => <li key={member.email}>
        {member.display_name || member.email} · {member.role} · {member.active ? 'active' : 'inactive'}
        {member.joined_at ? ' · joined' : ' · invitation pending'}
      </li>)}</ul>
    </section>
    {admin ? <section>
      <h2>Inviting a team member</h2>
      <p>Ask the project administrator to add the intended email and approved role to the Studio allowlist, then send a one-use Supabase Auth email invitation. The recipient sets their own password. An invitation expires; membership remains active until revoked.</p>
      <p>Never share invitation links, codes or passwords in Studio notes or a pull request.</p>
    </section> : null}
  </>;
}
