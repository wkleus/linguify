-- Added retroactively to document the schema already applied in the Supabase dashboard

drop policy if exists "Users can only access their own history" on public.translation_history;
drop policy if exists "Users can insert own history" on public.translation_history;
drop policy if exists "Users can read own history" on public.translation_history;
drop policy if exists "Users can delete own history" on public.translation_history;

create policy "Users can insert own history" on public.translation_history
  for insert to authenticated with check (auth.uid() = user_id);

create policy "Users can read own history" on public.translation_history
  for select to authenticated using (auth.uid() = user_id);

create policy "Users can delete own history" on public.translation_history
  for delete to authenticated using (auth.uid() = user_id);