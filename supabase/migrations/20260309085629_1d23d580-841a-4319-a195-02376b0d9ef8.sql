
CREATE TABLE public.thumbs_up (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.thumbs_up ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert thumbs up" ON public.thumbs_up FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Anyone can read thumbs up" ON public.thumbs_up FOR SELECT TO anon, authenticated USING (true);
